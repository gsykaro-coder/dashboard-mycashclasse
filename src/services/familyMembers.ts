import { supabase } from './supabase'
import { FamilyMember, FamilyMemberInsert, FamilyMemberUpdate } from '../types'

// ============================================
// 👨‍👩‍👧‍👦 FAMILY MEMBERS - CRUD
// ============================================

/**
 * Lista todos os membros da família do usuário
 */
export async function getFamilyMembers(userId: string): Promise<{ data: FamilyMember[] | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from('family_members')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      return { data: null, error: new Error(error.message) }
    }

    return { data, error: null }
  } catch (error) {
    return { data: null, error: error as Error }
  }
}

/**
 * Obtém um membro específico
 */
export async function getFamilyMember(id: string): Promise<{ data: FamilyMember | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from('family_members')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      return { data: null, error: new Error(error.message) }
    }

    return { data, error: null }
  } catch (error) {
    return { data: null, error: error as Error }
  }
}

/**
 * Cria um novo membro da família
 */
export async function createFamilyMember(member: FamilyMemberInsert): Promise<{ data: FamilyMember | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from('family_members')
      .insert(member)
      .select()
      .single()

    if (error) {
      return { data: null, error: new Error(error.message) }
    }

    return { data, error: null }
  } catch (error) {
    return { data: null, error: error as Error }
  }
}

/**
 * Atualiza um membro da família
 */
export async function updateFamilyMember(id: string, updates: FamilyMemberUpdate): Promise<{ data: FamilyMember | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from('family_members')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      return { data: null, error: new Error(error.message) }
    }

    return { data, error: null }
  } catch (error) {
    return { data: null, error: error as Error }
  }
}

/**
 * Deleta um membro da família
 */
export async function deleteFamilyMember(id: string): Promise<{ error: Error | null }> {
  try {
    const { error } = await supabase
      .from('family_members')
      .delete()
      .eq('id', id)

    if (error) {
      return { error: new Error(error.message) }
    }

    return { error: null }
  } catch (error) {
    return { error: error as Error }
  }
}

/**
 * Lista apenas membros ativos
 */
export async function getActiveFamilyMembers(userId: string): Promise<{ data: FamilyMember[] | null; error: Error | null }> {
  try {
    const { data, error } = await supabase
      .from('family_members')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (error) {
      return { data: null, error: new Error(error.message) }
    }

    return { data, error: null }
  } catch (error) {
    return { data: null, error: error as Error }
  }
}
