---
title: 'Useful Tools and Tricks for working with AWS CloudFormation'
subtitle: The tools and tricks I use to be more productive working with AWS CloudFormation.
date: '2022-09-14'
---

[CloudFormation][cfn_home] (aka _"CFN"_) is AWS' _Infrastructure as Code_ ("IaC") solution that allows you to define your resources using templates
instead of manually provisioning the resources via the Console. Using IaC has many benefits over manual provisioning, including:

- The ability to track changes in your version control system

    This allows you to see the changes to the resources over time and understand why changes were made.

- The ability to reproduce the same resources across many environments

    For example: dev, test, staging and production. This reduces
    common issues caused by trying to manually set up multiple environments.

- Association of infrastructure changes to code changes in your application
- Rollback of "Stack" creation or updates

    If a "stack" creation or update fails to succeed, CloudFormation will attempt to automatically rollback the changes
  to the last successful deployment (during an update). Or during creation, will typically delete the aborted Resources.

One of the benefits about CloudFormation is that you can write the templates in either JSON or YAML and they both produce
the same results. Though I'm not normally a YAML fan, I do prefer the YAML syntax for CFN as I find it easier to read than
the JSON implementation.

I have been working with CloudFormation for several years now, after a lot of badgering from one of my friends. Although
CloudFormation can be hard to wrap your head around when getting started, its benefits have greatly paid off for me.
Over the years, I have found various tools and tricks that make working with CFN easier and more enjoyable.

## Tools

Here are a few of the tools that I rely on when writing CFN templates. I'm sure there are many more that I'm missing,
so please reach out on Twitter if you have suggestions.

- I use Visual Studio Code for 95% of my development, and CFN is included in that. Its built-in YAML syntax highlighting
  is great and there are many extensions available for it.
- [cfn-lint][cfn_lint] is a linter for CFN templates. It will tell you when there are syntax errors with your template,
  such as invalid references or keywords.
- [cfn_nag][cfn_nag] is similar to cfn-lint, but will also warn you about best practices you may be violating. For example
  it will warn you when you try to create an S3 bucket without encryption enabled.

## Tricks

We all have our own little tips and tricks for daily development. These are a few of my favorite CFN tricks that I've
learned over time. If you have more, of course feel free to reach out on Twitter.

- Start small

    I always let this one bite me. When creating a new template from scratch, start with minimal resources. Particularly
    during the initial Stack creation, if it fails, you need to manually delete that Stack before trying again -- which
    can be an annoying & time consuming task.

    If the stack fails to succeed, CFN will automatically roll back your changes (unless you tell it not to). Some services
    such as RDS or OpenSearch clusters take a _long_ time to provision and you'll waste a lot of time waiting for them to
    create and then roll back.

- Come up with a standard file "layout"

    For me, I always do the following order for the groups: `Parameters, Conditions, Mappings, Outputs, Resources`.
    Using a consistent format will make it easier for you to navigate your templates across multiple projects.

- Either group or alphabetize your Parameters

    I prefer to generally alphabetize my parameters, but of course there are exceptions.

    Adding
    [AWS::CloudFormation::Interface][cfninterface]
    can also be a way of helping your consumers/developers better grok the grouping and functionality of Parameters.

- Group like resources together

    For example, if you are defining a Lambda function, define its IAM role and Log Group
    directly above where you're defining the Lambda resource.

- **Always** ensure resources such as Log Groups have retention policies specified to avoid wasting money on unnecessary log data.

- When definiting the properties of resources, alphabetize them like the documentation does

    It makes it easier to update and debug over time.

- If you need to see documentation about a particular resource type, copy the type value, such as `AWS::S3::Bucket`, and
  paste it into Google as the official CFN docs is usually the first result.

- Create helper scripts

    I do all of my work with CFN Stacks via the AWS CLI. To make this even easier and reduce typing
    over the lifespan of a project, I create scripts to wrap the `aws cloudformation deploy` command with the appropriate
    parameters.

- Keep your template files within your project/Git repository

    Bonus points for having a CI/CD setup that makes it easier to track when Stack changes worked, failed, and when
    changes were executed.

- If you have "shared" templates that you use across multiple projects (even if just for reference), create a Git repository
  so that you can version control them.

These are just a few of the tools and tricks I use to make creating and managing CFN stacks more enjoyable. I'm sure there
are many more, so please reach out on [Twitter][twitter] if you have any suggestions or questions.

[cfn_home]: https://aws.amazon.com/cloudformation/
[cfn_lint]: https://github.com/aws-cloudformation/cfn-lint
[cfn_nag]: https://github.com/stelligent/cfn_nag
[cfninterface]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-cloudformation-interface.htm
[twitter]: https://twitter.com/millicanmatt
