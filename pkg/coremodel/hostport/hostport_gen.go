// This file is autogenerated. DO NOT EDIT.
//
// Run "make gen-cue" from repository root to regenerate.
//
// Derived from the Thema lineage at pkg/coremodel/hostport

package hostport

import (
	"embed"
	"path/filepath"

	"github.com/grafana/grafana/pkg/cuectx"
	"github.com/grafana/grafana/pkg/framework/coremodel"
	"github.com/grafana/thema"
)

// Hostport defines model for hostport.
//
// THIS TYPE IS INTENDED FOR INTERNAL USE BY THE GRAFANA BACKEND, AND IS SUBJECT TO BREAKING CHANGES.
// Equivalent Go types at stable import paths are provided in https://github.com/grafana/grok.
type Model struct {
	Host *string `json:"Host,omitempty"`
	Port *string `json:"Port,omitempty"`
}

//go:embed coremodel.cue
var cueFS embed.FS

// codegen ensures that this is always the latest Thema schema version
var currentVersion = thema.SV(0, 0)

// Lineage returns the Thema lineage representing a Grafana hostport.
//
// The lineage is the canonical specification of the current hostport schema,
// all prior schema versions, and the mappings that allow migration between
// schema versions.
func Lineage(lib thema.Library, opts ...thema.BindOption) (thema.Lineage, error) {
	return cuectx.LoadGrafanaInstancesWithThema(filepath.Join("pkg", "coremodel", "dashboard"), cueFS, lib, opts...)
}

var _ thema.LineageFactory = Lineage
var _ coremodel.Interface = &Coremodel{}

// Coremodel contains the foundational schema declaration for hostports.
// It implements coremodel.Interface.
type Coremodel struct {
	lin thema.Lineage
}

// Lineage returns the canonical dashboard Lineage.
func (c *Coremodel) Lineage() thema.Lineage {
	return c.lin
}

// CurrentSchema returns the current (latest) hostport Thema schema.
func (c *Coremodel) CurrentSchema() thema.Schema {
	return thema.SchemaP(c.lin, currentVersion)
}

// GoType returns a pointer to an empty Go struct that corresponds to
// the current Thema schema.
func (c *Coremodel) GoType() interface{} {
	return &Model{}
}

// New returns a new instance of the hostport coremodel.
//
// Note that this function does not cache, and initially loading a Thema lineage
// can be expensive. As such, the Grafana backend should prefer to access this
// coremodel through a registry (pkg/framework/coremodel/registry), which does cache.
func New(lib thema.Library) (*Coremodel, error) {
	lin, err := Lineage(lib)
	if err != nil {
		return nil, err
	}

	return &Coremodel{
		lin: lin,
	}, nil
}
