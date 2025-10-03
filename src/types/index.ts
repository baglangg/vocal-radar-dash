export interface Call {
  id: string;
  phone: string;
  operator: string;
  operatorId: string;
  duration: number;
  score: number;
  status: 'queued' | 'processing' | 'processed' | 'failed';
  callTime: string;
  externalId?: string;
  tags: string[];
  audioUrl?: string;
}

export interface CallDetails extends Call {
  transcript: TranscriptUtterance[];
  auditSummary: AuditSummary;
  metadata: CallMetadata;
}

export interface TranscriptUtterance {
  id: string;
  speaker: 'operator' | 'client';
  start: number;
  end: number;
  text: string;
  confidence: number;
}

export interface AuditSummary {
  finalScore: number;
  scriptCompliance: number;
  topicMatch: number;
  lexiconPenalty: number;
  resolutionBonus: number;
  issues: AuditIssue[];
  strengths: string[];
}

export interface AuditIssue {
  type: 'script' | 'lexicon' | 'topic' | 'resolution';
  severity: 'low' | 'medium' | 'high';
  message: string;
  timestamp?: number;
}

export interface CallMetadata {
  clientPhone: string;
  operatorId: string;
  operatorName: string;
  duration: number;
  startTime: string;
  externalId?: string;
  tags: string[];
}

export interface KPICard {
  title: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down';
  icon: string;
}

export interface ClientProfile {
  phone: string;
  status: 'regular' | 'vip' | 'problematic';
  callsCount: number;
  avgScore: number;
  unresolvedTickets: number;
  calls: Call[];
  commonTopics: string[];
}

export interface UploadQueueItem {
  id: string;
  file: File;
  status: 'uploading' | 'queued' | 'processing' | 'done' | 'failed';
  progress: number;
  callId?: string;
  error?: string;
}
