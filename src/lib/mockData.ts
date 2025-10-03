import { Call, CallDetails, ClientProfile, KPICard } from '@/types';

export const mockKPIs: KPICard[] = [
  {
    title: 'Средний балл',
    value: 78.5,
    change: 2.3,
    trend: 'up',
    icon: 'TrendingUp'
  },
  {
    title: 'Звонков сегодня',
    value: 247,
    change: -5,
    trend: 'down',
    icon: 'Phone'
  },
  {
    title: 'Открытых тикетов',
    value: 18,
    change: 0,
    icon: 'AlertCircle'
  },
  {
    title: 'Ср. время обработки',
    value: '3:24',
    change: -8,
    trend: 'up',
    icon: 'Clock'
  }
];

export const mockCalls: Call[] = [
  {
    id: 'c1',
    phone: '+7 701 234 5678',
    operator: 'Айгерим Нурпеис',
    operatorId: 'op1',
    duration: 245,
    score: 85.2,
    status: 'processed',
    callTime: '2024-10-03T09:24:00Z',
    externalId: 'KC-2024-001',
    tags: ['техподдержка', 'роуминг'],
  },
  {
    id: 'c2',
    phone: '+7 777 555 1234',
    operator: 'Ерлан Касымов',
    operatorId: 'op2',
    duration: 180,
    score: 72.8,
    status: 'processed',
    callTime: '2024-10-03T09:45:00Z',
    tags: ['тариф', 'жалоба'],
  },
  {
    id: 'c3',
    phone: '+7 702 888 9999',
    operator: 'Динара Омарова',
    operatorId: 'op3',
    duration: 320,
    score: 91.5,
    status: 'processed',
    callTime: '2024-10-03T10:12:00Z',
    tags: ['новое подключение', 'промо'],
  },
  {
    id: 'c4',
    phone: '+7 701 234 5678',
    operator: 'Айгерим Нурпеис',
    operatorId: 'op1',
    duration: 95,
    score: 45.3,
    status: 'processed',
    callTime: '2024-10-03T10:45:00Z',
    externalId: 'KC-2024-002',
    tags: ['конфликт', 'эскалация'],
  },
  {
    id: 'c5',
    phone: '+7 705 111 2222',
    operator: 'Нурлан Садыков',
    operatorId: 'op4',
    duration: 210,
    score: 88.7,
    status: 'processing',
    callTime: '2024-10-03T11:20:00Z',
    tags: ['баланс', 'пополнение'],
  },
];

export const mockCallDetails: CallDetails = {
  ...mockCalls[0],
  transcript: [
    {
      id: 't1',
      speaker: 'operator',
      start: 0,
      end: 4.5,
      text: 'Здравствуйте, это служба поддержки Kcell, меня зовут Айгерим. Чем могу помочь?',
      confidence: 0.95
    },
    {
      id: 't2',
      speaker: 'client',
      start: 5,
      end: 12,
      text: 'Добрый день! У меня проблема с роумингом, я не могу звонить за границей.',
      confidence: 0.92
    },
    {
      id: 't3',
      speaker: 'operator',
      start: 13,
      end: 18,
      text: 'Понимаю вашу ситуацию. Давайте проверим настройки вашего номера.',
      confidence: 0.94
    },
    {
      id: 't4',
      speaker: 'client',
      start: 19,
      end: 24,
      text: 'Хорошо, спасибо. Это срочно, мне нужно решить это сегодня!',
      confidence: 0.88
    },
    {
      id: 't5',
      speaker: 'operator',
      start: 25,
      end: 35,
      text: 'Конечно, я сейчас активирую международный роуминг. Это займет несколько минут. Вы находитесь в какой стране?',
      confidence: 0.93
    },
  ],
  auditSummary: {
    finalScore: 85.2,
    scriptCompliance: 90,
    topicMatch: 95,
    lexiconPenalty: 0,
    resolutionBonus: 10,
    issues: [
      {
        type: 'script',
        severity: 'low',
        message: 'Не предложена проверка баланса',
        timestamp: 15
      }
    ],
    strengths: [
      'Быстрое выявление проблемы',
      'Эмпатия к клиенту',
      'Четкое решение'
    ]
  },
  metadata: {
    clientPhone: '+7 701 234 5678',
    operatorId: 'op1',
    operatorName: 'Айгерим Нурпеис',
    duration: 245,
    startTime: '2024-10-03T09:24:00Z',
    externalId: 'KC-2024-001',
    tags: ['техподдержка', 'роуминг'],
  }
};

export const mockClientProfile: ClientProfile = {
  phone: '+7 701 234 5678',
  status: 'vip',
  callsCount: 12,
  avgScore: 75.4,
  unresolvedTickets: 2,
  calls: [mockCalls[0], mockCalls[3]],
  commonTopics: ['роуминг', 'тариф', 'техподдержка']
};

export const mockChartData = {
  callsPerDay: [
    { date: '01.10', calls: 234 },
    { date: '02.10', calls: 267 },
    { date: '03.10', calls: 247 },
    { date: '04.10', calls: 289 },
    { date: '05.10', calls: 256 },
    { date: '06.10', calls: 301 },
    { date: '07.10', calls: 278 },
  ],
  avgScorePerOperator: [
    { name: 'Айгерим Н.', score: 85.2 },
    { name: 'Ерлан К.', score: 72.8 },
    { name: 'Динара О.', score: 91.5 },
    { name: 'Нурлан С.', score: 78.3 },
    { name: 'Асель Б.', score: 82.7 },
  ],
  topicsDistribution: [
    { name: 'Техподдержка', value: 35 },
    { name: 'Тарифы', value: 28 },
    { name: 'Роуминг', value: 18 },
    { name: 'Жалобы', value: 12 },
    { name: 'Прочее', value: 7 },
  ]
};
