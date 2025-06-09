import MyCoursesPanel from "./MyCoursesPanel";
import MyExercisesPanel from "./MyExercisesPanel";
export default function CurrentActivityPanels({ user }: { user: UserData }) {
  return (
    <section aria-labelledby="quick-links-title">
      <h2 id="quick-links-title" className="sr-only">
        Quick links
      </h2>
      <div className="space-y-8">
        <MyCoursesPanel user={user} />
        <div className="border-t border-gray-300" />
        <MyExercisesPanel user={user} />
      </div>
    </section>
  );
}
