

import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import Project from "../../../lib/model/Projects";
import { withPublicProjects } from "@/data/project-media";

function createSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// ✅ GET: Fetch projects
// Frontend gets only published. Admin passes ?all=true to get all.
export async function GET(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const showAll = searchParams.get('all') === 'true';

    const query = showAll ? {} : { 
      $or: [
        { publishStatus: 'published' },
        { publishStatus: { $exists: false } }
      ]
    };
    const projects = await Project.find(query).lean();

    const formatted = projects.map((p) => ({
      _id: p._id.toString(),
      title: p.title,
      slug: p.slug,
      description: p.description,
      category: p.category,
      subCategory: p.subCategory || null,
      publishStatus: p.publishStatus || 'published',
      status: p.status,
      images: p.images || [],
      skills: p.skills || [],
      features: p.features || [],
      liveLink: p.liveLink || null,
      repoLink: p.repoLink || null,
      creatorName: p.creatorName,
      creatorPicture: p.creatorPicture || "/creator-avatar.png",
      creatorProfile: p.creatorProfile || null,
      creatorNiche: p.creatorNiche || "",
      deadline: p.deadline ? p.deadline.toISOString().split("T")[0] : null,
      createdAt: p.createdAt ? p.createdAt.toISOString().split("T")[0] : null,
    }));

    return NextResponse.json({ success: true, data: showAll ? formatted : withPublicProjects(formatted) }, { status: 200 });
  } catch (err) {
    console.error("Error fetching projects:", err);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}

// ✅ POST: Create a new project
export async function POST(req) {
  await dbConnect();

  try {
    const contentType = req.headers.get("content-type") || "";
    let data = {};

    if (contentType.includes("multipart/form-data")) {
      const form = await req.formData();
      data.title = form.get("title");
      data.description = form.get("description");
      data.category = form.get("category");
      data.status = form.get("status");
      data.skills = form.get("skills")
        ? form.get("skills").split(",").map((s) => s.trim())
        : [];
      data.features = form.get("features")
        ? form.get("features").split(",").map((f) => f.trim())
        : [];
      data.liveLink = form.get("liveLink") || "";
      data.repoLink = form.get("repoLink") || "";
      data.publishStatus = form.get("publishStatus") || "draft";
      data.imageFile = form.get("image");
      data.galleryFiles = form.getAll("gallery") || [];
    } else if (contentType.includes("application/json")) {
      data = await req.json();
      data.skills = data.skills || [];
      data.features = data.features || [];
      data.galleryFiles = data.gallery || [];
    } else {
      return NextResponse.json(
        { success: false, error: "Unsupported content type" },
        { status: 400 }
      );
    }

    if (!data.title || !data.description || !data.category || !data.status) {
      return NextResponse.json(
        { success: false, error: "Required fields are missing" },
        { status: 400 }
      );
    }

    const slug = createSlug(data.title);

    let imageUrl = "/placeholder.svg";
    if (typeof data.imageFile === "string" && data.imageFile) {
      imageUrl = data.imageFile;
    }

    const galleryUrls = Array.isArray(data.galleryFiles)
      ? data.galleryFiles.filter(Boolean)
      : [];

    const project = new Project({
      title: data.title,
      slug,
      description: data.description,
      category: data.category,
      publishStatus: data.publishStatus || 'draft',
      status: data.status,
      skills: data.skills,
      features: data.features,
      liveLink: data.liveLink,
      repoLink: data.repoLink,
      images: [{ url: imageUrl }, ...galleryUrls.map((url) => ({ url }))],
      creatorName: "Admin",
      creatorPicture: "/creator-avatar.png",
      creatorProfile: data.liveLink || null,
      creatorNiche: data.category,
      deadline: new Date(),
    });

    await project.save();

    return NextResponse.json(
      { success: true, data: project },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
