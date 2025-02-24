import SubscribeCoursesCta from "../@modal/(.)access-paid-content/SubscribeCoursesCta";

export default function AccessPaidContentPage() {
  return (
    <div className="mx-auto my-16 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
          <div className="px-4 py-5 sm:px-6">
            <h1>Courses</h1>
            {/* Content goes here */}
            {/* We use less vertical padding on card headers on desktop than on body sections */}
          </div>
          <SubscribeCoursesCta />
          <div className="px-4 py-4 sm:px-6">
            {/* Content goes here */}
            {/* We use less vertical padding on card footers at all sizes than on headers or body sections */}
          </div>
        </div>
      </div>
    </div>
  );
}
