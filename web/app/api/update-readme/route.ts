import { NextResponse } from "next/server"
import { generateReadmeContent } from "@/app/generate-readme"
import fs from "fs"
import path from "path"

export async function POST() {
  try {
    const content = generateReadmeContent()
    const readmePath = path.join(process.cwd(), "README.md")

    fs.writeFileSync(readmePath, content, "utf8")

    return NextResponse.json({
      success: true,
      message: "README.md has been updated successfully.",
    })
  } catch (error) {
    console.error("Error updating README.md:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update README.md",
        error: error.message,
      },
      { status: 500 },
    )
  }
}

