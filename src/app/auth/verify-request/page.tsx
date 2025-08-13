export default function VerifyRequestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="mx-auto h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
          <span className="text-white font-bold text-xl">HX</span>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Check your email
        </h1>
        
        <p className="text-gray-600 mb-6">
          A sign in link has been sent to your email address.
        </p>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-700">
            If you don't see it, check your spam folder.
          </p>
        </div>
        
        <div className="mt-6">
          <a
            href="/auth/signin"
            className="text-blue-600 hover:text-blue-500 font-medium"
          >
            ← Back to sign in
          </a>
        </div>
      </div>
    </div>
  )
}
