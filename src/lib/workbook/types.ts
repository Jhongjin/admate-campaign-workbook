/** 브리프 작성 폼과 서버(xlsx 생성·메일 발송)가 함께 쓰는 자료 구조입니다. */

export type Contact = {
  partnerType: "advertiser" | "agency";
  company: string;
  brand: string;
  name: string;
  email: string;
  phone: string;
  advertiser: string;
  hasAgency: boolean;
  agencyCompany: string;
  agencyName: string;
  agencyEmail: string;
  agencyPhone: string;
};

export type Campaign = {
  id: string;
  name: string;
  budget: string;
  budgetType: "daily" | "lifetime";
  startDate: string;
  endDate: string;
  objective: "views" | "clicks";
  country: string;
};

export type Product = {
  id: string;
  campaignId: string;
  brand: string;
  name: string;
  summary: string;
  features: string;
  benefit: string;
  difference: string;
  target: string;
  need: string;
  conditions: string;
  keyMessage: string;
  banned: string;
  url: string;
  priority: "high" | "normal" | "low";
  notes: string;
};

export type Creative = {
  id: string;
  campaignId: string;
  productId: string;
  fileName: string;
  imageUrl: string;
  message: string;
  target: string;
  scope: string;
  startDate: string;
  endDate: string;
  url: string;
  notice: string;
};

export type Policy = {
  tone: string;
  competitor: "yes" | "limited" | "no";
  comparison: "yes" | "limited" | "no";
  legal: string;
  banned: string;
  excluded: string;
  notes: string;
  references: string;
  customerSources: string;
  keywords: string;
};

export type WorkbookDraft = {
  contact: Contact;
  campaigns: Campaign[];
  products: Product[];
  creatives: Creative[];
  policy: Policy;
};

/** 제출 시 함께 기록하는 접수 정보입니다. */
export type SubmissionMeta = {
  receiptNo: string;
  submittedAt: string;
};

export type SubmitPayload = {
  draft: WorkbookDraft;
  consents: string[];
};
