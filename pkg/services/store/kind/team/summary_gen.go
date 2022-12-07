// THIS FILE IS GENERATED. EDITING IS FUTILE.
//
// Generated by:
//     kinds/gen.go
// Using jennies:
//     SummarizerJenny
//
// Run 'make gen-cue' from repository root to regenerate.

package team

import "github.com/grafana/grafana/pkg/kindsys"

// Summarizer returns a func that takes raw bytes representing a Team
// and constructs a [kindsys.EntitySummary].
func Summarizer() kindsys.Summarizer {
	// This func is a gateway. The generated body depends on the kind's handleSummary value.

	// handleSummary is "generic" for the Team kind. The generic summary
	// extractor is used.
	return kindsys.GenericSummarizer("Team")
}
