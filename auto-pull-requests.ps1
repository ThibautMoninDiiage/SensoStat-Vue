# Variables
$organization = "$env:SYSTEM_TEAMFOUNDATIONCOLLECTIONURI"
$project = "$env:SYSTEM_TEAMPROJECT"
$repositoryId = "sensostatvue"

# Creating a HEADER
$headers = @{}
$headers.Add("Authorization", "Bearer $env:SYSTEM_ACCESSTOKEN")
$headers.Add("Content-Type", "application/json")

# Defining source branch / target branch
$sourceBranch = "dev"
$targetBranch = "master"

# Create a Pull Request
$pullRequestUrl = "$organization$project/_apis/git/repositories/$repositoryId/pullrequests?api-version=7.1-preview.1"

$pullRequest = @{
        "sourceRefName" = "refs/heads/$sourceBranch"
        "targetRefName" = "refs/heads/$targetBranch"
        "title" = "Pull from $sourceBranch to $targetBranch"
        "description" = "Merge $sourceBranch to $targetBranch"
    }

$pullRequestJson = ($pullRequest | ConvertTo-Json -Depth 5)
Write-Output $pullRequestJson

Write-Output "Creating a new pull request from $sourceBranch to $targetBranch"

# REST call to create a Pull Request

$pullRequestCall = Invoke-RestMethod -Method POST -Headers $headers -Body $pullRequestJson -Uri $pullRequestUrl;
$pullRequestId = $pullRequestCall.pullRequestId
