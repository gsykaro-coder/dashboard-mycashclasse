import ProfileForm from '../components/profile/ProfileForm/ProfileForm'

export default function Profile() {
  return (
    <div className="py-6 md:py-8 w-full">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
        Perfil
      </h1>
      
      <ProfileForm />
    </div>
  )
}
