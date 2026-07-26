"""add domain and category columns

Revision ID: fb5b5bdbf20b
Revises: 
Create Date: 2026-07-25 21:17:05.769516

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = 'fb5b5bdbf20b'
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column(
        "browser_history",
        sa.Column(
            "domain",
            sa.String(),
            nullable=True
        )
    )

    op.add_column(
        "browser_history",
        sa.Column(
            "category",
            sa.String(),
            nullable=True
        )
    )

    op.create_index(
        "ix_browser_history_domain",
        "browser_history",
        ["domain"]
    )


def downgrade() -> None:
    op.drop_index(
        "ix_browser_history_domain",
        table_name="browser_history"
    )

    op.drop_column(
        "browser_history",
        "category"
    )

    op.drop_column(
        "browser_history",
        "domain"
    )
