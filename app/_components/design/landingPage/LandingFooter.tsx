export default function LandingFooter() {
  return (
    <footer className="mx-auto mt-32 max-w-7xl px-6 lg:px-8">
      <div className="border-t border-gray-900/10 py-16 sm:py-24 lg:py-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* <Image alt="Company logo" src="/logo.png" className="h-9" /> */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  Solutions
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <a
                      href="#"
                      className="text-sm text-gray-600 hover:text-gray-900"
                    >
                      Burnout Courses
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-sm text-gray-600 hover:text-gray-900"
                    >
                      Chatbot Assessments
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-sm text-gray-600 hover:text-gray-900"
                    >
                      Guided Journaling
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-900">Support</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <a
                      href="#"
                      className="text-sm text-gray-600 hover:text-gray-900"
                    >
                      FAQ
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-sm text-gray-600 hover:text-gray-900"
                    >
                      Contact Support
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
