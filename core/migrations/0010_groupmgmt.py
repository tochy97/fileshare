# Generated by Django 3.2.8 on 2021-11-26 03:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
        ('core', '0009_alter_group_admins'),
    ]

    operations = [
        migrations.CreateModel(
            name='GroupMgmt',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='auth.user')),
                ('group', models.ManyToManyField(to='core.Group')),
            ],
        ),
    ]
