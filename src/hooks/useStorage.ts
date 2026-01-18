import { useState } from 'react'
import * as storageService from '../services/storage'
import { BucketName } from '../services/storage'

export function useStorage() {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const uploadFile = async (bucket: BucketName, path: string, file: File) => {
    setUploading(true)
    setError(null)

    try {
      const result = await storageService.uploadFile({
        bucket,
        path,
        file,
      })

      if (result.error) {
        setError(result.error)
        return null
      }

      return result.data
    } catch (err) {
      const error = err as Error
      setError(error)
      return null
    } finally {
      setUploading(false)
    }
  }

  const uploadAvatar = async (userId: string, file: File) => {
    setUploading(true)
    setError(null)

    try {
      const result = await storageService.uploadAvatar(userId, file)

      if (result.error) {
        setError(result.error)
        return null
      }

      return result.data
    } catch (err) {
      const error = err as Error
      setError(error)
      return null
    } finally {
      setUploading(false)
    }
  }

  const uploadFamilyMemberAvatar = async (memberId: string, file: File) => {
    setUploading(true)
    setError(null)

    try {
      const result = await storageService.uploadFamilyMemberAvatar(memberId, file)

      if (result.error) {
        setError(result.error)
        return null
      }

      return result.data
    } catch (err) {
      const error = err as Error
      setError(error)
      return null
    } finally {
      setUploading(false)
    }
  }

  const uploadAccountLogo = async (accountId: string, file: File) => {
    setUploading(true)
    setError(null)

    try {
      const result = await storageService.uploadAccountLogo(accountId, file)

      if (result.error) {
        setError(result.error)
        return null
      }

      return result.data
    } catch (err) {
      const error = err as Error
      setError(error)
      return null
    } finally {
      setUploading(false)
    }
  }

  const uploadDocument = async (userId: string, transactionId: string, file: File) => {
    setUploading(true)
    setError(null)

    try {
      const result = await storageService.uploadDocument(userId, transactionId, file)

      if (result.error) {
        setError(result.error)
        return null
      }

      return result.data
    } catch (err) {
      const error = err as Error
      setError(error)
      return null
    } finally {
      setUploading(false)
    }
  }

  const getPublicUrl = (bucket: BucketName, path: string) => {
    return storageService.getPublicUrl(bucket, path)
  }

  const getSignedUrl = async (bucket: BucketName, path: string, expiresIn?: number) => {
    return storageService.getSignedUrl(bucket, path, expiresIn)
  }

  const deleteFile = async (bucket: BucketName, path: string) => {
    setError(null)

    try {
      const result = await storageService.deleteFile(bucket, path)

      if (result.error) {
        setError(result.error)
        return false
      }

      return true
    } catch (err) {
      const error = err as Error
      setError(error)
      return false
    }
  }

  return {
    uploading,
    error,
    uploadFile,
    uploadAvatar,
    uploadFamilyMemberAvatar,
    uploadAccountLogo,
    uploadDocument,
    getPublicUrl,
    getSignedUrl,
    deleteFile,
  }
}
