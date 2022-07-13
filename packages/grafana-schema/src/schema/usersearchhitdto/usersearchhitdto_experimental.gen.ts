// This file is autogenerated. DO NOT EDIT.
//
// Run "make gen-cue" from repository root to regenerate.
//
// Derived from the Thema lineage at pkg/coremodel/usersearchhitdto


// This model is a WIP and not yet canonical. Consequently, its members are
// not exported to exclude it from grafana-schema's public API surface.

interface Usersearchhitdto {
  authLabels?: string[];
  avatarUrl?: string;
  email?: string;
  id?: number;
  isAdmin?: boolean;
  isDisabled?: boolean;
  lastSeenAt?: string;
  lastSeenAtAge?: string;
  login?: string;
  name?: string;
}

const defaultUsersearchhitdto: Partial<Usersearchhitdto> = {
  authLabels: [],
};
