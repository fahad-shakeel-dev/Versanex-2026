
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import LoadingAnimation from "../../loading";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import ProjectHeader from "@/components/projects/SingleProject/ProjectHeader";
import ProjectAbout from "@/components/projects/SingleProject/ProjectAbout";
import ProjectStory from "@/components/projects/SingleProject/ProjectStory";
import ProjectDetails from "@/components/projects/SingleProject/ProjectDetails";
import RelatedProjects from "@/components/projects/SingleProject/RelatedProjects";
import { getStaticProject, withProjectMedia } from "@/data/project-media";


export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState(() => getStaticProject(params.slug));
  const [loading, setLoading] = useState(() => !getStaticProject(params.slug));
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [relatedProjects, setRelatedProjects] = useState(() => getStaticProject(params.slug)?.relatedProjects || []);

useEffect(() => {
  if (project?.isStatic || !project?._id) return;

  const viewedKey = `viewed_${project._id}`;

  // 🧠 Check localStorage to prevent re-count from same browser
  if (typeof window !== "undefined" && localStorage.getItem(viewedKey)) return;

  const trackView = async () => {
    try {
      const res = await fetch("/api/views", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId: project._id }),
      });
      const data = await res.json();
      console.log("View Tracked:", data);
      if (data.counted) {
        localStorage.setItem(viewedKey, "true");
      }
    } catch (err) {
      console.error("Error tracking view:", err);
    }
  };

  trackView();
}, [project?._id]);


  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      setError(null);
      setReviews([]);
      setRelatedProjects([]);
      const staticProject = getStaticProject(params.slug);
      if (staticProject) {
        setProject(staticProject);
        setReviews(staticProject.reviews);
        setRelatedProjects(staticProject.relatedProjects);
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`/api/projects/${params.slug}`);
        const result = await response.json();

        if (!result.success) {
          setError(result.error || "Project not found");
          setProject(null);
          return;
        }

        const projectData = withProjectMedia(result.data || {});
        setProject(projectData);

        // Fetch Reviews with enhanced error handling
        try {
          const reviewsResponse = await fetch(`/api/projects/${params.slug}/reviews`);
          if (!reviewsResponse.ok) {
            throw new Error(`HTTP error! Status: ${reviewsResponse.status}`);
          }
          const reviewsData = await reviewsResponse.json();
          console.log("Reviews fetched:", reviewsData); // Debug log
          if (reviewsData.success) {
            setReviews(reviewsData.data || []);
          } else {
            console.error("Reviews fetch failed:", reviewsData.error);
            setReviews([]);
          }
        } catch (reviewsError) {
          console.error("Error fetching reviews:", reviewsError.message);
          setReviews([]);
        }

        // Fetch Related Projects
        const relatedResponse = await fetch(
          `/api/projects?category=${projectData.category}&limit=3&exclude=${params.slug}`
        );
        const relatedData = await relatedResponse.json();
        if (relatedData.success)
          setRelatedProjects((relatedData.data || []).filter(item => item.slug !== params.slug && item.category === projectData.category).slice(0, 3).map(withProjectMedia));
      } catch (err) {
        console.error("Error fetching project:", err);
        setError("Error fetching project: " + err.message);
        setProject(null);
      } finally {
        setLoading(false);
      }
    };

    if (params.slug) fetchProject();
  }, [params.slug]);

  if (loading) {
    return (
      <>
      <LoadingAnimation/>
      </>
    );
  }

  if (error || !project) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #f5e2b8, #f9f0d0, #fffaf2)",
        }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
          {error || "Project not found"}
        </h1>
        <button
          onClick={() => router.push("/projects")}
          className="px-4 py-2 text-white rounded-lg transition-all text-base sm:text-lg"
          style={{
            background: "linear-gradient(90deg, #d88f07, #e2a63c)",
            boxShadow: "0 4px 10px rgba(216, 143, 7, 0.4)",
          }}
        >
          Back to Portfolio
        </button>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="bg-[#f5f5f5]">
        <ProjectHeader project={project} />
        <div id="project-details" className="scroll-mt-6"><ProjectAbout project={project} /></div>
        <ProjectStory project={project} />
        <ProjectDetails key={project.slug} project={project} reviews={reviews} />
        <div className="max-w-[1800px] mx-auto px-5 pb-16 md:px-[5%]">
          <RelatedProjects relatedProjects={relatedProjects} />
        </div>
      </main>

      <Footer />
    </>
  );
}
