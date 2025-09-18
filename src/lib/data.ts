import type { Grade } from './types';

export const AppData: Grade[] = [
  {
    id: '9',
    name: 'ધોરણ ૯',
    subjects: [
      {
        id: 'maths',
        name: 'ગણિત',
        chapters: [
          {
            id: 'chapter-1',
            name: 'પ્રકરણ ૧: સંખ્યા પદ્ધતિ',
            content:
              'આ પ્રકરણમાં આપણે વાસ્તવિક સંખ્યાઓ, તેમના દશાંશ નિરૂપણ અને સંખ્યા રેખા પર તેમના સ્થાન વિશે ઊંડાણમાં શીખીશું. આપણે સંમેય અને અસંમેય સંખ્યાઓ વચ્ચેનો તફાવત પણ સમજીશું.',
            videoUrl: 'https://www.youtube.com/embed/videoseries?list=PL3-fG_I9I5Q-3kZzXzR5E-8e4Q3X-yT3p',
            imageUrl: 'placeholder-math',
            imageHint: 'numbers abstract',
            quiz: [
              {
                question: 'નીચેનામાંથી કઈ સંખ્યા અસંમેય છે?',
                options: ['√4', '0.333...', 'π', '2/3'],
                correctAnswerIndex: 2,
              },
              {
                question: '36/100 નું દશાંશ સ્વરૂપ શું છે?',
                options: ['3.6', '0.36', '0.036', '36.0'],
                correctAnswerIndex: 1,
              },
            ],
          },
          {
            id: 'chapter-2',
            name: 'પ્રકરણ ૨: બહુપદીઓ',
            content: 'આ પ્રકરણ બહુપદીઓ, તેમના પ્રકારો, શૂન્યો અને બહુપદીઓના ભાગાકાર વિશે વિસ્તૃત માહિતી આપે છે.',
            quiz: [],
          },
        ],
      },
      {
        id: 'science',
        name: 'વિજ્ઞાન',
        chapters: [
          {
            id: 'chapter-1',
            name: 'પ્રકરણ ૧: આપણી આસપાસમાં દ્રવ્ય',
            content:
              'આ પ્રકરણ દ્રવ્યના ભૌતિક સ્વરૂપ, તેની અવસ્થાઓ (ઘન, પ્રવાહી, વાયુ) અને અવસ્થામાં થતા ફેરફારોનું વર્ણન કરે છે.',
            quiz: [],
          },
        ],
      },
    ],
  },
  {
    id: '10',
    name: 'ધોરણ ૧૦',
    subjects: [
      {
        id: 'maths',
        name: 'ગણિત',
        chapters: [
          {
            id: 'chapter-1',
            name: 'પ્રકરણ ૧: વાસ્તવિક સંખ્યાઓ',
            content: 'આ પ્રકરણમાં યુક્લિડનું ભાગાકારનું પૂર્વપ્રમેય અને અંકગણિતનું મૂળભૂત પ્રમેય જેવા મહત્વના સિદ્ધાંતોનો અભ્યાસ કરીશું.',
            quiz: [],
          },
        ],
      },
      {
        id: 'science',
        name: 'વિજ્ઞાન',
        chapters: [
          {
            id: 'chapter-1',
            name: 'પ્રકરણ ૧: રાસાયણિક પ્રક્રિયાઓ અને સમીકરણો',
            content:
              'આ પ્રકરણમાં આપણે રાસાયણિક સમીકરણો કેવી રીતે લખવા અને સંતુલિત કરવા, તેમજ વિવિધ પ્રકારની રાસાયણિક પ્રક્રિયાઓ જેવી કે સંયોગીકરણ, વિઘટન, વિસ્થાપન અને રેડોક્ષ પ્રક્રિયાઓનો અભ્યાસ કરીશું.',
            imageUrl: 'placeholder-science',
            imageHint: 'chemistry reaction',
            quiz: [
              {
                question: 'જ્યારે લેડ નાઇટ્રેટને ગરમ કરવામાં આવે છે, ત્યારે કયો વાયુ ઉત્પન્ન થાય છે?',
                options: ['O₂', 'NO₂', 'H₂', 'CO₂'],
                correctAnswerIndex: 1,
              },
              {
                question: 'પાણીના વિદ્યુતવિભાજન દરમિયાન કયો વાયુ એનોડ પર એકત્રિત થાય છે?',
                options: ['હાઈડ્રોજન', 'ઓક્સિજન', 'નાઇટ્રોજન', 'કાર્બન ડાયોક્સાઇડ'],
                correctAnswerIndex: 1,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: '11',
    name: 'ધોરણ ૧૧',
    subjects: [],
  },
  {
    id: '12',
    name: 'ધોરણ ૧૨',
    subjects: [],
  },
];
