export type ProfileProps = {
  userId: string;
  displayName: string;
  pictureUrl?: string;
  statusMessage?: string;
};

export type Relation = {
  inviteeId: string;
  inviterId: string;
  inviterName: string;
  inviterCode: string;
};

export type Code = {
  userId: string;
  displayName: string;
  code: string;
};

export type RelationInfo = {
  inviterInfo?: {
    id: string;
    name: string;
    code: string;
  };
  inviteeCount: number;
};

export type CodeInfo = {
  code: string;
};
