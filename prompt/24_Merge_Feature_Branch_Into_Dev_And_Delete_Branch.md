# Prompt 24: Merge Feature Branch into Dev and Delete Feature Branch

**User Prompt:**
> # 11. Delete local branch
> git branch -d your-branch-name
> 
> # 12. Delete remote branch
> git push origin --delete your-branch-name
> 
> use this step and merge the current feature branch in dev branch

---

### Action Steps:
1. Stage and commit all pending changes on current feature branch.
2. Switch to dev branch (or create dev from remote/main if needed).
3. Merge feature branch into dev.
4. Push dev branch to remote origin.
5. Delete local feature branch (git branch -d <branch>).
6. Delete remote feature branch (git push origin --delete <branch>).