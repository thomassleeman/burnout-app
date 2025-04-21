Where is userAtom being used?

Nav
user.organisation
To populate a link to the organisation page for admin users.

nav/OrgIndicator
user.organisation.logoUrl
To display the organisation logo in the navigation bar. get rid of this!

chatbot/bot/UserAvatar
user?.providerData[0]?.displayName
To display the user's initials in the chatbot interface.

home/Announcements
user?.assessments?.burnoutAssessment;
To conditionally display a chatbot reminder prompt

home/AssessmentVisualisation
user.assessments.burnoutAssessment
To display the assessment results in a chart.

home/Calendar
user.journaling
To display the user's journaling data in the calendar.

home/MyCoursesPanel
user?.courses
To display the user's courses and progress in the MyCoursesPanel component.

home/MyExercisesPanel
user?.exercises
To display the user's exercises and progress in the MyExercisesPanel component.

home/StressLevelVisualisation
user.stressRating
To display the user's stress ratings as a line graph

home/WelcomePanel
user.providerData[0].displayName
user.journaling
user.assessments?.burnoutAssessment
Shows welcome message and time since data for a few things.

journaling/JournalWithCalendar
user?.journaling
Used to set journal data

profile/[uid]/ProfileContent
user.organisation
Used only to provide a link to the user's organisation if they are an admin

Summary:

Organisation x2
User name x2
Burnout Assessment data x3
Journaling data x3
Courses data
Exercises data
Stress rating data

nav height calculation for pages that need to be exactly height of screen: h-[calc(100vh-72px)]
uninstalled:

unist-util-visit
"mdast-util-from-markdown": "^2.0.0",
"react-remark": "^2.1.0",
"rehype-raw": "^7.0.0",
rehype-sanitize
"react-quill": "^2.0.0",
"react-simple-chatbot": "^0.6.1",
react-type-animation
remark
react-markdown
"next-mdx-remote": "^4.4.1",
"gray-matter": "^4.0.3",
