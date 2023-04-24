import fs from "fs"
import path from "path"

class ChangelogParser {
    public parseChangelog(): void {
        console.log("start parsing changelog...")

        // make a backup copy of the original file
        const originalFile = path.join(__dirname, "CHANGELOG.md")
        const backupFile = originalFile.replace(".md", "_backup.md")
        fs.copyFileSync(originalFile, backupFile)

        // handle repeat lines
        const fileContents = fs.readFileSync(originalFile, "utf-8")
        const lines = fileContents.split("\n").map((line) => line.trim())
        const uniqueCommits = this.removeSameCommit(lines)

        // save new file
        fs.writeFileSync(originalFile, uniqueCommits.join("\n"), "utf-8")
        console.log(`comment parsed.saved to => ${originalFile}`)
    }

    private removeSameCommit(commitList: string[]): string[] {
        const commitMap = new Map<string, string>()
        for (const line of commitList) {
            let processedLine: string
            if (!line.includes("#")) {
                processedLine = line.toLowerCase()
            } else {
                processedLine = line
            }

            const match = processedLine.match(/(?<=\*\s).*?(?=\()/)
            if (match) {
                const title = match[0].trim()
                commitMap.set(title, line)
            } else {
                const match2 = processedLine.match(/[*] [**](.*)[**] ([^:]+): (.*) \((.*)\)/)
                if (match2) {
                    const messageTitle = match2[3].trim()
                    commitMap.set(messageTitle, line)
                } else {
                    commitMap.set(line, line)
                }
            }
        }

        return Array.from(commitMap.values())
    }
}

const changelogParser = new ChangelogParser()
changelogParser.parseChangelog()