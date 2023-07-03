import Link from 'next/link';
import { FC } from 'react';

type Message = {
  id: string;
  message: string;
  trigger?: string;
  end?: boolean;
};

type Options = {
  id: string;
  options: {
    value: number;
    label: string;
    trigger: string;
  }[];
};

type Component = {
  id: string;
  component: FC;
};
// }
type Steps = (Message | Options)[];

const BotRedirect = ({ url, message }) => {
  return (
    <div>
      <Link href={url}>{message}</Link>
    </div>
  );
};

const Lorem = () => {
  return (
    <article>
      <h2>Confidentiality Article</h2>
      <p>
        I still need to style this to make it look tidier but this is just an
        example for now. Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. Nullam porttitor tincidunt egestas. Curabitur ultricies
        ullamcorper sem id fermentum. Sed suscipit neque sit amet sapien
        hendrerit, eu aliquet mi vestibulum. Sed velit orci, convallis eget arcu
        sit amet, pretium sagittis leo. Vestibulum tempus metus quis erat
        porttitor mollis. Maecenas ut odio consectetur, cursus metus non,
        facilisis felis. Vestibulum fermentum mattis libero, in lacinia dolor
        malesuada non. Quisque aliquet lectus et sem maximus eleifend. Integer
        consectetur aliquet dapibus. Nunc et blandit neque. Suspendisse a enim
        sem. Fusce erat risus, mattis ut lobortis ac, auctor eget mauris. Nulla
        elementum volutpat massa, ac fermentum sapien hendrerit in. Mauris
        semper finibus dolor. Ut pulvinar dui rhoncus maximus eleifend. Ut
        euismod, enim et tempus eleifend, eros libero egestas tortor, in rhoncus
        nisi turpis ut dolor. Sed consequat rutrum ante quis feugiat. Aliquam
        tempor mauris non scelerisque vehicula. Nunc luctus luctus nisl ut
        sollicitudin. Duis iaculis risus sed augue tincidunt, ac molestie lacus
        auctor. Suspendisse elit dolor, euismod sit amet mauris ut, sollicitudin
        feugiat ante. Phasellus suscipit tempus ipsum. Curabitur eu metus a
        risus interdum pulvinar. Duis lobortis interdum sapien sit amet commodo.
        Aenean consectetur gravida libero, eu vehicula dolor mollis sed. Etiam
        viverra ornare nunc. Donec vitae arcu vitae elit efficitur sodales
        tempor at enim. Pellentesque elit erat, porttitor in tincidunt sit amet,
        interdum et eros. Donec sit amet feugiat augue. Donec facilisis lacus ut
        mauris venenatis tristique. Pellentesque ornare cursus lorem id laoreet.
        Donec et leo magna. Curabitur placerat metus quis accumsan pretium.
        Suspendisse arcu arcu, auctor non dui vestibulum, volutpat aliquet
        metus. Vestibulum feugiat convallis mi, non interdum urna congue ut.
        Nulla ut pellentesque tellus. Fusce sodales tincidunt sapien, quis
        venenatis orci laoreet eget. Nam at dolor sit amet lectus dictum
        porttitor. Morbi vel nulla in erat sollicitudin faucibus. Phasellus
        auctor ultricies felis quis volutpat. Nam posuere, ex eu vestibulum
        pretium, felis erat finibus sapien, id lobortis tortor velit id tellus.
        Maecenas in nunc sit amet ante ornare dictum sit amet ac tortor. Sed
        consequat pretium est sed pretium. Aliquam erat volutpat. Mauris ut
        sodales nunc, a facilisis elit. Suspendisse rhoncus massa erat, gravida
        gravida nisl dapibus et. Integer porttitor in tellus id maximus. Donec
        porttitor arcu nulla, at scelerisque nisi blandit quis. Vivamus aliquam
        quis augue sit amet lobortis. Nam mollis ante eu mi commodo pretium vel
        et diam. Etiam at dui non augue tempor suscipit. In ac egestas tellus.
        Suspendisse mollis tincidunt leo et faucibus. Aenean sagittis, arcu a
        porta congue, lacus arcu sodales ligula, sit amet placerat ligula mi et
        justo. Nulla malesuada lectus in sapien sodales, ut tincidunt eros
        placerat. Nullam congue porttitor mattis. Curabitur vel nulla a purus
        tincidunt condimentum. Nunc maximus nibh arcu, nec fringilla lacus
        eleifend commodo. Phasellus maximus mattis ex. Pellentesque id lobortis
        odio, ac congue nunc. Vivamus ullamcorper lorem diam, tempor pulvinar
        nisl sagittis at. Aenean bibendum eros nec elit condimentum, ut pulvinar
        nisl efficitur. Vestibulum at molestie ipsum. Proin at odio consequat,
        ullamcorper turpis sit amet, faucibus purus. Nunc mauris mauris, posuere
        eget elit pulvinar, lobortis efficitur neque. Ut nec ipsum eleifend,
        viverra urna ut, rhoncus mi. Sed vehicula erat risus.
      </p>
    </article>
  );
};

export const initialSteps: Steps = [
  /////////////////////////////////////////////
  ////////INTRODUCTION/////////////////////////
  /////////////////////////////////////////////
  {
    id: 'intro1A',
    message:
      'Hi, so that I can help you, let’s check in and see how you are doing.',
    trigger: 'intro1B',
  },
  {
    id: 'intro1B',
    message:
      'How about answering some questions? This will take just a few minutes and will allow me to guide you towards content that I believe would be helpful to you personally.',
    trigger: 'intro1C',
  },
  {
    id: 'intro1C',
    message:
      'Please rest assured that your answers here are completely confidential. Nobody else will have access to any of your answers.',
    trigger: 'intro1D',
  },
  {
    id: 'intro1D',
    message: 'That includes your colleagues and your boss.',
    trigger: 'intro1R',
  },
  //Response
  {
    id: 'intro1R',
    options: [
      {
        value: 1,
        label: "OK, let's proceed.",
        trigger: 'intro2A',
      },
      {
        value: 2,
        label: "I don't want to do this now.",
        trigger: 'introEnd',
      },
      {
        value: 3,
        label: 'Tell me more about confidentiality.',
        trigger: 'intro3A',
      },
    ],
  },
  {
    id: 'intro2A',
    message: 'Great! ',
    trigger: 'instr1A',
  },

  {
    id: 'intro3A',
    message:
      'Here is an article from our information section that discusses these issues in much greater detail.',
    trigger: 'intro3B',
  },
  {
    id: 'intro3B',
    component: <Lorem />,
    trigger: 'intro3R',
  },
  //Response
  {
    id: 'intro3R',
    options: [
      {
        value: 1,
        label: "OK, let's start.",
        trigger: 'intro2A',
      },
      {
        value: 2,
        label: "I don't want to continue.",
        trigger: 'introEnd',
      },
    ],
  },
  {
    id: 'introEnd',
    message:
      "No problem. It's important to check in with yourself regularly just to see how you’re doing. Come back any time if you want to check in and we will take it from there..",
    end: true,
  },

  /////////////////////////////////////////////
  ////////INSTRUCTIONS/////////////////////////
  /////////////////////////////////////////////
  {
    id: 'instr1A',
    message:
      "So, I'm going to give you a few statements which I would like you to consider...",
    trigger: 'instr1B',
  },
  {
    id: 'instr1B',
    message: 'I want you to think only about the last 2 weeks in work...',
    trigger: 'instr1C',
  },
  {
    id: 'instr1C',
    message:
      'After each statement a list of options will appear to allow you to say how often you have felt like the statement is true for you.',
    trigger: 'instr1R',
  },
  //Response
  {
    id: 'instr1R',
    options: [
      { value: 1, label: "Got it, let's start", trigger: 'instr3A' },
      {
        value: 2,
        label: 'Tell me more about why this is useful.',
        trigger: 'instr2A',
      },
    ],
  },
  {
    id: 'instr2A',
    //TODO: This message needs adding to
    message:
      'No problem. This assessment is based on... (This message is unfinished) ',
    trigger: 'instr2B',
  },
  {
    id: 'instr2B',
    component: (
      <BotRedirect
        message="To learn more, click on this message to be taken to the relevant information page. You can come back to the assessment any time by looking for me on your home screen."
        url="https://google.com"
      />
    ),
    trigger: 'instr2R',
  },
  //Response
  {
    id: 'instr2R',
    options: [
      {
        value: 1,
        label: "Let's proceed",
        trigger: 'instr3A',
      },
    ],
  },
  {
    id: 'instr3A',
    message:
      "Great, so here's the first statement. Remember, you're just thinking about the last two weeks...",
    trigger: 'energy1A',
  },

  /////////////////////////////////////////////
  ////////ENERGY///////////////////////////////
  /////////////////////////////////////////////
  {
    id: 'energy1A',
    message:
      '"I have felt I have had enough energy each day to carry out my job."',
    trigger: 'energy1_R',
  },
  //Response
  {
    id: 'energy1_R',
    options: [
      { value: 4, label: 'Not at all', trigger: 'energy1B' },
      { value: 3, label: 'Only occasionally', trigger: 'energy1B' },
      { value: 2, label: 'Sometimes', trigger: 'energy1B' },
      { value: 1, label: 'Often', trigger: 'energy1B' },
      { value: 0, label: 'All the time', trigger: 'energy1B' },
    ],
  },
  {
    id: 'energy1B',
    message: 'Thanks. The next one is...',
    trigger: 'focus1A',
  },

  /////////////////////////////////////////////
  ////////FOCUS////////////////////////////////
  /////////////////////////////////////////////
  {
    id: 'focus1A',
    message:
      '"I have felt that I have been able to concentrate and focus on all my tasks."',
    trigger: 'focus1_R',
  },
  //Response
  {
    id: 'focus1_R',
    options: [
      { value: 4, label: 'Not at all', trigger: 'focus1B' },
      { value: 3, label: 'Only occasionally', trigger: 'focus1B' },
      { value: 2, label: 'Sometimes', trigger: 'focus1B' },
      { value: 1, label: 'Often', trigger: 'focus1B' },
      { value: 0, label: 'All the time', trigger: 'focus1B' },
    ],
  },
  {
    id: 'focus1B',
    message: 'OK. How about this one...',
    trigger: 'support1A',
  },

  /////////////////////////////////////////////
  ////////SUPPORT//////////////////////////////
  /////////////////////////////////////////////
  {
    id: 'support1A',
    message:
      '"I have felt I could turn to my colleagues and management when I needed support."',
    trigger: 'support1_R',
  },
  //Response
  {
    id: 'support1_R',
    options: [
      { value: 4, label: 'Not at all', trigger: 'support2A' },
      { value: 3, label: 'Only occasionally', trigger: 'support2A' },
      { value: 2, label: 'Sometimes', trigger: 'support2A' },
      { value: 1, label: 'Often', trigger: 'support2A' },
      { value: 0, label: 'All the time', trigger: 'support2A' },
    ],
  },
  {
    id: 'support2A',
    message: 'Right. Now I would like you to consider the following...',
    trigger: 'capability1A',
  },
  /////////////////////////////////////////////
  ////////CAPABILITY///////////////////////////
  /////////////////////////////////////////////
  {
    id: 'capability1A',
    message:
      '"I have felt I have the ability and resources to carry out my job."',
    trigger: 'capability1_R',
  },
  //Response
  {
    id: 'capability1_R',
    options: [
      { value: 4, label: 'Not at all', trigger: 'capability2A' },
      { value: 3, label: 'Only occasionally', trigger: 'capability2A' },
      { value: 2, label: 'Sometimes', trigger: 'capability2A' },
      { value: 1, label: 'Often', trigger: 'capability2A' },
      { value: 0, label: 'All the time', trigger: 'capability2A' },
    ],
  },
  {
    id: 'capability2A',
    message: 'Thanks. Just two more of these now...',
    trigger: 'engagement1A',
  },

  /////////////////////////////////////////////
  ////////ENGAGEMENT///////////////////////////
  /////////////////////////////////////////////
  {
    id: 'engagement1A',
    message: '"I have felt my work and effort has had a meaningful impact."',
    trigger: 'engagement1_R',
  },
  //Response
  {
    id: 'engagement1_R',
    options: [
      { value: 4, label: 'Not at all', trigger: 'engagement2A' },
      { value: 3, label: 'Only occasionally', trigger: 'engagement2A' },
      { value: 2, label: 'Sometimes', trigger: 'engagement2A' },
      { value: 1, label: 'Often', trigger: 'engagement2A' },
      { value: 0, label: 'All the time', trigger: 'engagement2A' },
    ],
  },
  {
    id: 'engagement2A',
    message: 'Ok, and the last one...',
    trigger: 'outlook1A',
  },

  /////////////////////////////////////////////
  ////////OUTLOOK//////////////////////////////
  /////////////////////////////////////////////
  {
    id: 'outlook1A',
    message: '"I have felt optimistic about the future of my career."',
    trigger: 'outlook1_R',
  },
  //Response
  {
    id: 'outlook1_R',
    options: [
      { value: 4, label: 'Not at all', trigger: 'end' },
      { value: 3, label: 'Only occasionally', trigger: 'end' },
      { value: 2, label: 'Sometimes', trigger: 'end' },
      { value: 1, label: 'Often', trigger: 'end' },
      { value: 0, label: 'All the time', trigger: 'end' },
    ],
  },
  {
    id: 'end',
    message: 'Thanks. This is the end',
    end: true,
  },
];

export const secondarySteps = [
  {
    id: 'xxx',
    message: 'Your score is...',
    end: true,
  },
];
