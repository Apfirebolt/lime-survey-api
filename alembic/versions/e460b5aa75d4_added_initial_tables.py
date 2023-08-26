"""Added initial tables

Revision ID: e460b5aa75d4
Revises: 
Create Date: 2023-08-27 02:30:16.805321

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e460b5aa75d4'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('username', sa.String(length=50), nullable=True),
    sa.Column('email', sa.String(length=255), nullable=True),
    sa.Column('role', sa.String(length=50), nullable=True),
    sa.Column('firstName', sa.String(length=50), nullable=True),
    sa.Column('lastName', sa.String(length=50), nullable=True),
    sa.Column('password', sa.String(length=255), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('survey',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('createdDate', sa.DateTime(), nullable=True),
    sa.Column('title', sa.String(length=50), nullable=True),
    sa.Column('description', sa.Text(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('question',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('questionText', sa.String(length=100), nullable=True),
    sa.Column('createdDate', sa.DateTime(), nullable=True),
    sa.Column('survey_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['survey_id'], ['survey.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('option',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('optionText', sa.String(length=100), nullable=True),
    sa.Column('createdDate', sa.DateTime(), nullable=True),
    sa.Column('question_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['question_id'], ['question.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('option')
    op.drop_table('question')
    op.drop_table('survey')
    op.drop_table('user')
    # ### end Alembic commands ###
