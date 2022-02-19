# construct base URLs
#$apisUrl = "$($env:SYSTEM_TEAMFOUNDATIONCOLLECTIONURI)/$($env:SYSTEM_TEAMPROJECT)/_apis"
#$projectUrl = "$apisUrl/git/repositories/sensostatvue"
# Variables
$organization = $env:SYSTEM_TEAMFOUNDATIONCOLLECTIONURI)
$project = $env:SYSTEM_TEAMPROJECT)
$repositoryId = $env:repositoryId

Write-Output "Org : $organization | project : $project | repositoryId : $repositoryId"

# create common headers
$headers = @{}
$headers.Add("Authorization", "Bearer $env:SYSTEM_ACCESSTOKEN")
$headers.Add("Content-Type", "application/json")

# Defining source branch / target branch
$sourceBranch = "dev"
$targetBranch = "master"

# Create a Pull Request
$pullRequestUrl = POST https://dev.azure.com/$organization/$project/_apis/git/repositories/$repositoryId/pullrequests?api-version=7.1-preview.1
# $pullRequestUrl = "$projectUrl/pullrequests?api-version=5.1"
$pullRequest = @{
        "sourceRefName" = "refs/heads/$sourceBranch"
        "targetRefName" = "refs/heads/$targetBranch"
        "title" = "Pull from $sourceBranch to $targetBranch"
        "description" = ""
    }

$pullRequestJson = ($pullRequest | ConvertTo-Json -Depth 5)

Write-Output "Sending a REST call to create a new pull request from $sourceBranch to $targetBranch"

# REST call to create a Pull Request

$pullRequestResult = Invoke-RestMethod -Method POST -Headers $headers -Body $pullRequestJson -Uri $pullRequestUrl;
$pullRequestId = $pullRequestResult.pullRequestId

Write-Output "Pull request created. Pull Request Id : $pullRequestId"

# Set PR to auto-complete
$setAutoComplete = @{
    "autoCompleteSetBy" = @{
        "id" = $pullRequestResult.createdBy.id
    }
    "completionOptions" = @{       
        "deleteSourceBranch" = $False
        "bypassPolicy" = $False
    }
}

$setAutoCompleteJson = ($setAutoComplete | ConvertTo-Json -Depth 5)

Write-Output "Sending a REST call to set auto-complete on the newly created pull request"

# REST call to set auto-complete on Pull Request
$pullRequestUpdateUrl = ($projectUrl + '/pullRequests/' + $pullRequestId + '?api-version=5.1')

$setAutoCompleteResult = Invoke-RestMethod -Method PATCH -Headers $headers -Body $setAutoCompleteJson -Uri $pullRequestUpdateUrl

Write-Output "Pull request set to auto-complete"
