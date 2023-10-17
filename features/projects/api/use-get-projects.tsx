import { useQuery } from "@tanstack/react-query";
import { getProjects } from "@api/projects";
import type { Project } from "@api/projects.types";

export function useGetProjects() {
  const queryInfo = useQuery<Project[], Error>(["projects"], getProjects, {
    retry: 0, // prevent infinite loading state
  });
  return queryInfo;
}
