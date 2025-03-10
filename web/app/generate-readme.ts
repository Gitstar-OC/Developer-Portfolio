import { designers } from "./designers"
import fs from "fs"
import path from "path"

// Function to generate markdown content for README
export function generateReadmeContent(): string {
  const header = `# Great Portfolios by Engineers

A curated list of exceptional portfolios by engineers and designers.

`

  const designerEntries = designers.map((designer) => {
    const { name, twitter, portfolio, github } = designer
    const twitterHandle = twitter.startsWith("@") ? twitter.substring(1) : twitter
    const twitterUrl = `https://twitter.com/${twitterHandle}`
    const githubUrl = github ? `https://github.com/${github}` : null

    let entry = `## [${name}](${portfolio})

- Portfolio: [${portfolio.replace(/(^\w+:|^)\/\//, "")}](${portfolio})
- Twitter: [@${twitterHandle}](${twitterUrl})`

    if (github) {
      entry += `\n- GitHub: [${github}](${githubUrl})`
    }

    entry += `\n\n`
    return entry
  })

  const footer = `
---

*This list is automatically generated from the \`designers.ts\` file in the project.*

*To view the interactive version of this list, please visit the website.*
`

  return header + designerEntries.join("") + footer
}

// This function can be used in a build script or server action to update the README
export async function updateReadme(): Promise<void> {
  const content = generateReadmeContent()
  const readmePath = path.join(process.cwd(), "README.md")

  try {
    fs.writeFileSync(readmePath, content, "utf8")
    console.log("README.md has been updated successfully.")
  } catch (error) {
    console.error("Error updating README.md:", error)
  }
}

