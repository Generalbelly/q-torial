import admin from "../admin";
export interface TutorialRecord {
  name: string|null;
  description: string|null;
  domain: string|null;
  pathOperator: string;
  pathValue: string|null;
  parameters: Array<Object>;
  settings: Object;
  buildUrl: string|null;
  isActive: boolean;
  gaId: string|null;
  createdAt: admin.firestore.FieldValue
  updatedAt: admin.firestore.FieldValue
}
