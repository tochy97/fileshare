# Generated by Django 3.2.8 on 2021-11-26 22:36

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('core', '0012_rename_groupname_group_name'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='GroupMgmt',
            new_name='GrpMgmt',
        ),
    ]
