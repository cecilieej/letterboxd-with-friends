export default function Help() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Help & FAQ</h1>

      {/* Quick Start */}
      <section className="bg-gray-800 p-6 rounded-xl border border-gray-700 mb-8">
        <h2 className="text-2xl font-semibold mb-4">🚀 Quick Start Guide</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2 text-blue-400">
              Step 1: Export Your Letterboxd Data
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-300 ml-4">
              <li>Go to <a href="https://letterboxd.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Letterboxd.com</a></li>
              <li>Log into your account</li>
              <li>Click on your profile picture → Settings</li>
              <li>Go to <strong>Import & Export</strong> section</li>
              <li>Click <strong>Export Your Data</strong></li>
              <li>Download the ZIP file and extract it</li>
              <li>Find the <code className="bg-gray-700 px-2 py-1 rounded">watched.csv</code> file</li>
            </ol>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2 text-blue-400">
              Step 2: Upload to Cece's Letterboxd Friends
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-300 ml-4">
              <li>Log in with your Google account</li>
              <li>Go to your Dashboard</li>
              <li>Click "Choose File" and select your <code className="bg-gray-700 px-2 py-1 rounded">watched.csv</code></li>
              <li>Wait for the upload to complete (this may take a few minutes)</li>
              <li>Your movies will appear on your dashboard!</li>
            </ol>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2 text-blue-400">
              Step 3: Connect with Friends
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-300 ml-4">
              <li>Share this app with your friends</li>
              <li>Once they upload their lists, they'll appear in your Friends tab</li>
              <li>Click on any friend to compare your movie tastes</li>
              <li>Discover what you have in common!</li>
            </ol>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold mb-4">❓ Frequently Asked Questions</h2>

        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h3 className="font-semibold mb-2">Is my data safe?</h3>
          <p className="text-gray-300">
            Yes! Your data is stored securely in Firebase (Google's cloud platform). Only you and the friends you choose to compare with can see your movie list. We don't share your data with any third parties.
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h3 className="font-semibold mb-2">What CSV file should I upload?</h3>
          <p className="text-gray-300">
            Upload the <code className="bg-gray-700 px-2 py-1 rounded">watched.csv</code> file from your Letterboxd export. This contains all the movies you've marked as watched, along with your ratings.
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h3 className="font-semibold mb-2">How long does the upload take?</h3>
          <p className="text-gray-300">
            It depends on how many movies you've watched! Each movie needs to be matched with TMDb (The Movie Database) to fetch poster images. For 100 movies, expect about 1-2 minutes. For 1000+ movies, it could take 10-15 minutes.
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h3 className="font-semibold mb-2">Can I update my movie list?</h3>
          <p className="text-gray-300">
            Yes! Just export your data from Letterboxd again and upload the new CSV file. It will replace your old data with the updated list.
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h3 className="font-semibold mb-2">Why can't I see any friends?</h3>
          <p className="text-gray-300">
            Friends will only appear once they've signed up and uploaded their own movie lists. Share the app with your movie-loving friends to start comparing!
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h3 className="font-semibold mb-2">What does the "similarity" percentage mean?</h3>
          <p className="text-gray-300">
            The similarity score shows how much overlap there is between your movie collection and your friend's. It's calculated based on the number of movies you've both watched compared to your combined unique movies.
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h3 className="font-semibold mb-2">Some of my movies don't have posters. Why?</h3>
          <p className="text-gray-300">
            We use TMDb (The Movie Database) to fetch movie posters. Some obscure or very old films might not have poster images available. The movie is still in your list, just without a poster!
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h3 className="font-semibold mb-2">Can I delete my account?</h3>
          <p className="text-gray-300">
            Currently, you need to contact us to delete your account. We're working on adding this feature to the app. For now, you can simply stop using the app and your data will remain private.
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h3 className="font-semibold mb-2">I found a bug or have a suggestion!</h3>
          <p className="text-gray-300">
            Great! We'd love to hear from you. This is a community project and we're always looking to improve. Please reach out with your feedback!
          </p>
        </div>
      </section>

      {/* Privacy */}
      <section className="mt-8 bg-gray-800 p-6 rounded-xl border border-gray-700">
        <h2 className="text-2xl font-semibold mb-4">🔒 Privacy & Data</h2>
        <ul className="space-y-2 text-gray-300">
          <li>✓ Your movie data is only visible to you and friends you compare with</li>
          <li>✓ We only store: your name, email, profile picture (from Google), and your movie list</li>
          <li>✓ We use Google Authentication for secure login</li>
          <li>✓ Movie posters and info come from TMDb, not Letterboxd</li>
          <li>✓ We don't sell or share your data with anyone</li>
        </ul>
      </section>

      {/* Contact */}
      <section className="mt-8 text-center p-6 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-xl border border-blue-700/30">
        <h2 className="text-2xl font-semibold mb-2">Still have questions?</h2>
        <p className="text-gray-300">
          This app is a passion project for movie lovers. If you need help or have feedback, feel free to reach out!
        </p>
      </section>
    </div>
  );
}