package serviceaccounts

import (
	"context"

	"github.com/grafana/grafana/pkg/services/apikey"
)

const (
	// GloballyHideAPIKeysTabOrgID is the org id used to indicate that the API keys tab should be hidden globally.
	GloballyHideAPIKeysTabOrgID = -1
)

/*
ServiceAccountService is the service that manages service accounts.

Service accounts are used to authenticate API requests. They are not users and
do not have a password.
*/
type Service interface {
	CreateServiceAccount(ctx context.Context, orgID int64, saForm *CreateServiceAccountForm) (*ServiceAccountDTO, error)
	DeleteServiceAccount(ctx context.Context, orgID, serviceAccountID int64) error
	RetrieveServiceAccount(ctx context.Context, orgID, serviceAccountID int64) (*ServiceAccountProfileDTO, error)
	RetrieveServiceAccountIdByName(ctx context.Context, orgID int64, name string) (int64, error)
	UpdateServiceAccount(ctx context.Context, orgID, serviceAccountID int64,
		saForm *UpdateServiceAccountForm) (*ServiceAccountProfileDTO, error)
	AddServiceAccountToken(ctx context.Context, serviceAccountID int64,
		cmd *AddServiceAccountTokenCommand) (*apikey.APIKey, error)
	CheckGloballyHideAPIKeysTab(ctx context.Context) bool
	HideApiKeysTab(ctx context.Context, orgID int64) error
}
