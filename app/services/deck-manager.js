import Service from '@ember/service';

const coronaAnxietyEN = {
  disclaimer: 'CAS: Coronavirus Anxiety Scale. The CAS is placed in the public domain to encourage its use in clinical assessment and research. No formal permission is therefore required for its reproduction and use by others, beyond appropriate citation of the present article.',
  original: {
    bibliography: 'Lee (2020)',
    url: 'https://www.tandfonline.com/doi/pdf/10.1080/07481187.2020.1748481?needAccess=true',
  },
  cards: [
    {
      id: '1',
      question: 'I felt dizzy, lightheaded, or faint, when I read or listened to news about the coronavirus.',
      clarification: 'Dizziness is a common symptom of anxiety stress. It feels like a sense of lightheadedness or wooziness. These symptoms are caused by legitimate physiologic changes within the brain because it is trying to fight the fear of Coronavirus.',
      image: 'card1',
      position: null,
      value: null
    },
    {
      id: '2',
      question: 'I had trouble falling or staying asleep because I was thinking about the coronavirus.',
      clarification: 'Anxiety is frequently connected to sleeping problems. Excess worry and fear make it harder to fall asleep and stay asleep through the night.',
      image: 'card2',
      position: null,
      value: null
    },
    {
      id: '3',
      question: 'I felt paralyzed or frozen when I thought about or was exposed to information about the coronavirus.',
      clarification: 'Here fits the analogy of the “deer in the headlights.” When a deer is about to be hit by a car, it doesn’t run or otherwise fight in any way: rather, it freezes. That freezing - while not the best course of action when a car is coming your way - is an evolutionary adaptation because in nature, sometimes remaining perfectly still minimizes your chances of being spotted by a predator. So, when we are faced with extreme fear or panic and we feel like we can’t move at all, we may be experiencing the “Freeze” response.',
      image: 'card3',
      position: null,
      value: null
    },
    {
      id: '4',
      question: 'I lost interest in eating when I thought about or was exposed to information about the coronavirus.',
      clarification: 'Being anxious causes the body to produce a stress response (fight or flight). The stress response is designed to bring about specific physiological, psychological, and emotional changes that enhance the bodys ability to deal with a threat. These changes include how the stomach and digestive system function. For example, the stress response causes the stomach to stop breaking down food and many people experience stomach and digestive problems, including having a lack of appetite.',
      image: 'card4',
      position: null,
      value: null
    },
    {
      id: '5',
      question: 'I felt nauseous or had stomach problems when I thought about or was exposed to information about the coronavirus.',
      clarification: 'Nausea is simply an unsettled feeling in your digestive system, mimicking the way your brain feels when you\'re stressed. In fact, anxiety is a form of stress caused by a spike in adrenaline which heightens our senses. Stress usually affects the whole body, and there isn\'t a single person who doesn\'t understand what being stressed feels like. You\'ve probably heard someone say that worrying made them "sick to their stomach" and that\'s all anxiety nausea is.',
      image: 'card5',
      position: null,
      value: null
    },

  ],
  answers: [
    { id: '1', answer: 'never', score: 0 },
    { id: '2', answer: 'almost never', score: 1 },
    { id: '3', answer: 'sometimes', score: 2 },
    { id: '4', answer: 'fairly often', score: 3 },
    { id: '5', answer: 'very often', score: 4 }
  ],
  results: [
    {
      minScore: 0,
      condition: 'Score lower than 10',
      image: 'image1',
      header: 'You are not experiencing significant anxiety level',
      content: [
        'You seem to be experiencing a significant anxiety level for the current coronavirus pandemic situation than most people. Although you can generally cope with stress and worry, the current situation with coronavirus might seem to be interfering with your ability to function in everyday life.',
        'In the current time of uncertainty, anxiety is a common problem, and the most important thing is that you accept and recognize your current state to decrease the frequency and intensity of these emotions.',
        'You can read our blog on informative sources for advice and tips on dealing with anxious feelings on your own. You can also find professional help nearest to you on follow up resources.'
      ],
      followUps: []
    },
    {
      minScore: 10,
      condition: 'Score of 10 of higher',
      image: 'image2',
      header: 'You seem to be experiencing a significant anxiety level',
      content: [
        'You seem to be experiencing a significant anxiety level for the current coronavirus pandemic situation than most people. Although you can generally cope with stress and worry, the current situation with coronavirus might seem to be interfering with your ability to function in everyday life. In the current time of uncertainty, anxiety is a common problem, and the most important thing is that you accept and recognize your current state to decrease the frequency and intensity of these emotions.',
        'You can read our blog on informative sources for advice and tips on dealing with anxious feelings on your own. You can also find professional help nearest to you on follow up resources.'
      ],
      followUps: []
    }
  ],
  followUps: {
    doctorSearch: {
      minScore: 10,
      usa: {
        title: "USA",
        payload: {
          key: "usa",
          description: "In the USA you need private insurance to cover therapy cost, however, you can find free or affordable help at your local health department’s mental health division or community mental health center.",
          steps: [
            {
              description: "You can visit your family doctor.",
              observations: "Bring your preassessment while visiting your doctor or other helpful sources.",
              findSpecialist: true
            },
            {
              description: "If not then contact clergy, or local Mental Health America office or crisis center.",
              observations: ["Obtain referrals from family doctor or clergy, or local Mental Health America office or crisis center or your insurance."],
              findSpecialist: true
            },
            {
              description: "Contact your insurance for eligibility.",
              observations: ["Medicare offers a list of participating doctors on its website, www.medicare.gov."]
            },
            {
              description: "If your insurance doesn't cover the cost,",
              observations: ["Providers who accept Medicaid may be listed by your state Medicaid office, which you can find by clicking on the name of your state at www.benefits.gov/benefits/browse-by-category/category/MED."]
            },
            {
              description: "(1) Please visit www.samhsa.gov/treatment  or call 1-800-662-HELP (4357) for affordable mental health care.",
              observations: []
            },
            {
              description: "(2) You can obtain free or low-cost treatment with your local health department’s mental health division or community mental health center.",
              observations: []
            },
            {
              description: "(3) Your company’s employee assistance program (EAP) can issue a referral to a provider. Reach out to your Human Resources office to get more information about your company’s EAP.",
              observations: []
            },
            {
              description: "(4) If you are a veteran then go to www.va.gov/health  or call 1-877-222-8387. If you already have benefits through the VA, visit www.va.gov/directory to find your nearest facility.",
              observations: []
            },
          ],
          specialist: "general physician"
        }
      },
      germany: {
        title: "Germany",
        payload: {
          key: "germany",
          description: "In Germany mental health support is most of the time covered by public health, however, to get access to it you have to first contact your Hausarzt. Please follow the following steps.",
          steps: [
            {
              description: "Visit a general practitioner.",
              observations: ["Bring ID and Pre-Assesment results."],
              findSpecialist: true
            },
            {
              description: "Get a prescription for psychotherapy.",
              observations: ["Explain your situation and ask for a prescription and recommendations for psychotherapy."]
            },
            {
              description: "Find the therapist near you with your language preference.",
              observations: [],
              findSpecialist: true
            },
            {
              description: "Contact your insurance if it covers the cost for this therapist under Gesetzliche Krankenversicherung (GKV).",
              observations: []
            },
            {
              description: "You get 4 trial sessions once you make the appointment to see the fit for you.",
              observations: []
            },
          ],
          specialist: "hausarzt"
        }
      },
      spain: {
        title: "Spain",
        payload: {
          key: "spain",
          description: "Description",
          steps: [
            {
              description: "This is the x step you have to follow.",
              observations: "Bring ID and Pre-Assesment results."
            },
            {
              description: "This is the x step you have to follow.",
              observations: []
            },
          ],
          specialist: "psicologo"
        }
      }
    },
    articleRecommendations: {
      carecards: [
        {
          title: "How to Soothe Coronavirus Anxiety?",
          description: "If you are experiencing increased anxiety recently due to coronavirus pandemic, then you are not alone. There has been a sudden shift …",
          url: "https://www.care-cards.io/post/how-to-soothe-coronavirus-anxiety"
        },
      ],
      usa: [
        {
          title: "How to care for your mental health during Pandemic",
          description: "Here you can also read current articles on mental health care and sources for finding therapeutical help.",
          url: "https://www.nimh.nih.gov/index.shtml",
          logo: "nih.jpg"
        },
        {
          title: "How to care for your mental health during Pandemic",
          description: "Here you can also read current articles on mental health care and sources for finding therapeutical help.",
          url: "https://www.cdc.gov/mentalhealth/index.htm",
          logo: "cdc.jpg"
        },
        {
          title: "How to care for your mental health during Pandemic",
          description: "Here you can also read current articles on mental health care and sources for finding therapeutical help.",
          url: "https://www.samhsa.gov/",
          logo: "samhsa.png"
        }
      ],
      germany: [
        {
          title: "How to care for your mental health during Pandemic",
          description: "Here you can also read current articles on mental health care and sources for finding therapeutical help.",
          url: "https://www.dgppn.de/",
          logo: "dgppn.png"
        },
        {
          title: "How to care for your mental health during Pandemic",
          description: "Here you can also read current articles on mental health care and sources for finding therapeutical help.",
          url: "https://www.europsyche.org/",
          logo: "eap.png"
        }
      ],
      spain: [
        {
          title: "Article name",
          description: "This article will help you understand better what Corona anxiety is.",
          logo: "spain"
        },
        {
          title: "Article name",
          description: "This article will help you understand better what Corona anxiety is.",
          logo: "spain"
        },
        {
          title: "Article name",
          description: "This article will help you understand better what Corona anxiety is.",
          logo: "spain"
        }
      ]
    },
  }
};

const tests = {
  coronaAnxiety: {
    'en-us': coronaAnxietyEN
  }
}

/**
 * Service responsible of loading card decks in application.
 */
export default class DeckManager extends Service {
  /**
   * Requests a game deck to the server
   * @param {string} deck - name of the test
   * @param {string} language - language of the test
   * @return {Promise<unknown>}
   */
  loadDeck(deck = 'coronaAnxiety', language = 'en-US') {
    return new Promise(resolve => resolve(tests[deck][language]));
  }
}
