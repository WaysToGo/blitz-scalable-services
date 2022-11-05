import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createJob from "app/jobs/mutations/createJob"
import { JobForm, FORM_ERROR } from "app/jobs/components/JobForm"

const NewJobPage: BlitzPage = () => {
  const router = useRouter()
  const [createJobMutation] = useMutation(createJob)

  return (
    <div>
      <h1>Create New Job</h1>

      <JobForm
        submitText="Create Job"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateJob}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const job = await createJobMutation(values)
            router.push(Routes.ShowJobPage({ jobId: job.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.JobsPage()}>
          <a>Jobs</a>
        </Link>
      </p>
    </div>
  )
}

NewJobPage.authenticate = true
NewJobPage.getLayout = (page) => <Layout title={"Create New Job"}>{page}</Layout>

export default NewJobPage
