# Variables
$organization = "$env:SYSTEM_TEAMFOUNDATIONCOLLECTIONURI"
$project = "$env:SYSTEM_TEAMPROJECT"
$repositoryId = "sensostatvue"

# Creating a HEADER
$headers = @{}
$headers.Add("Authorization", "Bearer cuywk3f7xu3gvb2u3aqfnga76ea5of3c4yueuviqjl2k7qoiviaa")
$headers.Add("Content-Type", "application/json")
$headers.Add("Accept", "application/json")

# Defining source branch / target branch
$sourceBranch = "dev"
$targetBranch = "master"

# Create a Pull Request
$pullRequestUrl = "$organization$project/_apis/git/repositories/$repositoryId/pullrequests?api-version=7.1-preview.1"
Write-Output "Request URL : $pullRequestUrl"

$pullRequest = @{
        "sourceRefName" = "refs/heads/$sourceBranch"
        "targetRefName" = "refs/heads/$targetBranch"
        "title" = "Pull from $sourceBranch to $targetBranch"
        "description" = "Merge $sourceBranch to $targetBranch"
    }

$pullRequestBody = ($pullRequest | ConvertTo-Json -Depth 5)

Write-Output "Creating a new pull request from $sourceBranch to $targetBranch"

# REST call to create a Pull Request
$pullRequestCall = Invoke-RestMethod -Method POST -Headers $headers -Body $pullRequestBody -Uri $pullRequestUrl
$pullRequestId = $pullRequestCall.pullRequestId

Write-Output "Pull request created. Pull Request Id : $pullRequestId"

# Set PR to auto-complete
$setAutoComplete = @{
    "autoCompleteSetBy" = @{
        "id" = $pullRequestCall.createdBy.displayName
    }
    "completionOptions" = @{       
        "deleteSourceBranch" = $False
        "bypassPolicy" = $False
    }
}

$setAutoCompleteBody = ($setAutoComplete | ConvertTo-Json -Depth 5)

Write-Output "Sending a REST call to set auto-complete on the newly created pull request"

# REST call to set auto-complete on Pull Request
$pullRequestUpdateUrl = "$organization$project/_apis/git/repositories/$repositoryId/pullrequests/$pullRequestId?api-version=7.1-preview.1"
Write-Output $pullRequestUpdateUrl

$setAutoCompleteResult = Invoke-RestMethod -Method PATCH -Headers $headers -Body $setAutoCompleteBody -Uri $pullRequestUpdateUrl

Write-Output "Pull request set to auto-complete"
