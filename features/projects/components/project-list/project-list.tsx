import { ProjectCard } from "../project-card";
import { useGetProjects } from "../../api/use-get-projects";
import styles from "./project-list.module.scss";
import { Alert } from "features/ui/alert/alert";

export function ProjectList() {
  const { data, isLoading, isError, error, refetch } = useGetProjects();

  if (isLoading) {
    return (
      <div className={styles.loadingWrapper} data-testid="loading-spinner">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/icons/loading-circle.svg"
          alt="Loading"
          width="64"
          height="64"
        />
      </div>
    );
  }

  if (isError) {
    console.error(error);
    return (
      <Alert
        message={error.message}
        alertType="error"
        onButtonClick={refetch}
      />
    );
  }

  return (
    <ul className={styles.list}>
      {data?.map((project) => (
        <li key={project.id}>
          <ProjectCard project={project} />
        </li>
      ))}
    </ul>
  );
}
