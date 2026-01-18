import { supabase } from './supabase'

// ============================================
// 📦 STORAGE - Upload/Download de Arquivos
// ============================================

export type BucketName = 'avatars' | 'account-logos' | 'documents'

export interface UploadOptions {
  bucket: BucketName
  path: string
  file: File
  options?: {
    cacheControl?: string
    contentType?: string
    upsert?: boolean
  }
}

export interface UploadResponse {
  data: { path: string; fullPath: string } | null
  error: Error | null
}

// ============================================
// 📤 UPLOAD
// ============================================

/**
 * Faz upload de um arquivo para o Storage
 */
export async function uploadFile(options: UploadOptions): Promise<UploadResponse> {
  try {
    const { data, error } = await supabase.storage
      .from(options.bucket)
      .upload(options.path, options.file, {
        cacheControl: options.options?.cacheControl || '3600',
        contentType: options.options?.contentType || options.file.type,
        upsert: options.options?.upsert || false,
      })

    if (error) {
      return { data: null, error: new Error(error.message) }
    }

    return {
      data: {
        path: data.path,
        fullPath: data.fullPath,
      },
      error: null,
    }
  } catch (error) {
    return { data: null, error: error as Error }
  }
}

/**
 * Faz upload de avatar de usuário
 */
export async function uploadAvatar(userId: string, file: File): Promise<UploadResponse> {
  const fileExt = file.name.split('.').pop()
  const fileName = `${userId}/avatar.${fileExt}`
  
  return uploadFile({
    bucket: 'avatars',
    path: fileName,
    file,
    options: {
      contentType: file.type,
      upsert: true,
    },
  })
}

/**
 * Faz upload de avatar de membro da família
 */
export async function uploadFamilyMemberAvatar(memberId: string, file: File): Promise<UploadResponse> {
  const fileExt = file.name.split('.').pop()
  const fileName = `${memberId}/avatar.${fileExt}`
  
  return uploadFile({
    bucket: 'avatars',
    path: fileName,
    file,
    options: {
      contentType: file.type,
      upsert: true,
    },
  })
}

/**
 * Faz upload de logo de conta/cartão
 */
export async function uploadAccountLogo(accountId: string, file: File): Promise<UploadResponse> {
  const fileExt = file.name.split('.').pop()
  const fileName = `${accountId}/logo.${fileExt}`
  
  return uploadFile({
    bucket: 'account-logos',
    path: fileName,
    file,
    options: {
      contentType: file.type,
      upsert: true,
    },
  })
}

/**
 * Faz upload de documento (comprovante, recibo, etc)
 */
export async function uploadDocument(userId: string, transactionId: string, file: File): Promise<UploadResponse> {
  const fileExt = file.name.split('.').pop()
  const timestamp = Date.now()
  const fileName = `${userId}/${transactionId}/${timestamp}.${fileExt}`
  
  return uploadFile({
    bucket: 'documents',
    path: fileName,
    file,
    options: {
      contentType: file.type,
      upsert: false,
    },
  })
}

// ============================================
// 📥 DOWNLOAD / URL
// ============================================

/**
 * Obtém URL pública de um arquivo
 */
export function getPublicUrl(bucket: BucketName, path: string): string {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path)
  return data.publicUrl
}

/**
 * Obtém URL assinada (temporária) de um arquivo
 */
export async function getSignedUrl(
  bucket: BucketName,
  path: string,
  expiresIn: number = 3600
): Promise<{ data: string | null; error: Error | null }> {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .createSignedUrl(path, expiresIn)

    if (error) {
      return { data: null, error: new Error(error.message) }
    }

    return { data: data.signedUrl, error: null }
  } catch (error) {
    return { data: null, error: error as Error }
  }
}

// ============================================
// 🗑️ DELETE
// ============================================

/**
 * Deleta um arquivo do Storage
 */
export async function deleteFile(bucket: BucketName, path: string): Promise<{ error: Error | null }> {
  try {
    const { error } = await supabase.storage.from(bucket).remove([path])

    if (error) {
      return { error: new Error(error.message) }
    }

    return { error: null }
  } catch (error) {
    return { error: error as Error }
  }
}

/**
 * Deleta avatar de usuário
 */
export async function deleteAvatar(userId: string): Promise<{ error: Error | null }> {
  try {
    // Lista todos os arquivos do usuário no bucket avatars
    const { data: files, error: listError } = await supabase.storage
      .from('avatars')
      .list(userId)

    if (listError) {
      return { error: new Error(listError.message) }
    }

    if (!files || files.length === 0) {
      return { error: null }
    }

    // Remove todos os arquivos do diretório do usuário
    const pathsToDelete = files.map(file => `${userId}/${file.name}`)
    const { error } = await supabase.storage
      .from('avatars')
      .remove(pathsToDelete)

    if (error) {
      return { error: new Error(error.message) }
    }

    return { error: null }
  } catch (error) {
    return { error: error as Error }
  }
}

// ============================================
// 📋 LIST
// ============================================

/**
 * Lista arquivos em um diretório do Storage
 */
export async function listFiles(
  bucket: BucketName,
  path: string,
  options?: { limit?: number; offset?: number; sortBy?: { column: string; order: 'asc' | 'desc' } }
): Promise<{ data: any[] | null; error: Error | null }> {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .list(path, {
        limit: options?.limit,
        offset: options?.offset,
        sortBy: options?.sortBy,
      })

    if (error) {
      return { data: null, error: new Error(error.message) }
    }

    return { data, error: null }
  } catch (error) {
    return { data: null, error: error as Error }
  }
}
