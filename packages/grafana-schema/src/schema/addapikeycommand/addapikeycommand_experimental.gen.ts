// This file is autogenerated. DO NOT EDIT.
//
// Run "make gen-cue" from repository root to regenerate.
//
// Derived from the Thema lineage at pkg/coremodel/addapikeycommand


// This model is a WIP and not yet canonical. Consequently, its members are
// not exported to exclude it from grafana-schema's public API surface.

interface Addapikeycommand {
  name?: string;
  role?: ('Viewer' | 'Editor' | 'Admin');
  secondsToLive?: number;
}
