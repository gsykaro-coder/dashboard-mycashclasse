import { useState, useEffect } from 'react'
import * as familyMembersService from '../services/familyMembers'
import { FamilyMember, FamilyMemberInsert, FamilyMemberUpdate } from '../types'
import { useAuth } from '../context/AuthContext'

export function useFamilyMembers() {
  const { user } = useAuth()
  const [members, setMembers] = useState<FamilyMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (user) {
      loadMembers()
    } else {
      setMembers([])
      setLoading(false)
    }
  }, [user])

  const loadMembers = async () => {
    if (!user) return

    setLoading(true)
    setError(null)

    try {
      const { data, error: err } = await familyMembersService.getFamilyMembers(user.id)
      if (err) {
        setError(err)
        setMembers([])
      } else {
        setMembers(data || [])
      }
    } catch (err) {
      setError(err as Error)
      setMembers([])
    } finally {
      setLoading(false)
    }
  }

  const createMember = async (member: FamilyMemberInsert) => {
    if (!user) {
      throw new Error('User not authenticated')
    }

    const { data, error: err } = await familyMembersService.createFamilyMember({
      ...member,
      user_id: user.id,
    })

    if (err) {
      throw err
    }

    if (data) {
      setMembers((prev) => [data, ...prev])
    }

    return data
  }

  const updateMember = async (id: string, updates: FamilyMemberUpdate) => {
    const { data, error: err } = await familyMembersService.updateFamilyMember(id, updates)

    if (err) {
      throw err
    }

    if (data) {
      setMembers((prev) => prev.map((m) => (m.id === id ? data : m)))
    }

    return data
  }

  const deleteMember = async (id: string) => {
    const { error: err } = await familyMembersService.deleteFamilyMember(id)

    if (err) {
      throw err
    }

    setMembers((prev) => prev.filter((m) => m.id !== id))
  }

  const activeMembers = members.filter((m) => m.is_active)

  return {
    members,
    activeMembers,
    loading,
    error,
    createMember,
    updateMember,
    deleteMember,
    refresh: loadMembers,
  }
}
