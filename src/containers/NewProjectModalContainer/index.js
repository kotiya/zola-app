// @flow
import React from 'react'
import { Query, Mutation } from 'react-apollo'
import Router from 'next/router'
import { toast } from 'react-toastify'
import serializeForm from 'form-serialize'
import ErrorPage from 'next/error'
import View from '@components/NewProjectModal'
import Wrapper from '@components/Wrapper'
import Loader from '@components/Loader'
import projectListQuery from '@containers/HomePageContainer/query.graphql'
import query from './query.graphql'
import mutation from './mutation.graphql'

type Props = {
  dialog: any
}

const NewProjectModalContainer = ({ dialog }: Props) => (
  <Wrapper>
    <Mutation
      mutation={mutation}
      // $FlowFixMe
      refetchQueries={[{ query: projectListQuery }]}
    >
      {(createProject, mutationData) => {
        return (
          <Query query={query}>
            {(queryData: any) => {
              if (queryData.error) {
                return <ErrorPage statusCode={404} />
              }

              if (queryData.loading) {
                return <Loader isCentered withText isDark />
              }

              return (
                <View
                  locales={queryData.data.locales}
                  errors={
                    mutationData.data
                      ? mutationData.data.createProject.errors
                      : []
                  }
                  isLoading={mutationData.loading}
                  onSubmit={async (e: any) => {
                    e.preventDefault()
                    const variables = serializeForm(e.target, { hash: true })
                    // $FlowFixMe
                    const response = await createProject({ variables })

                    if (response.data.createProject.status === 'SUCCESS') {
                      dialog.hide()
                      Router.push('/')
                      toast.success('✅ Success! The project has been created.')
                    }
                  }}
                />
              )
            }}
          </Query>
        )
      }}
    </Mutation>
  </Wrapper>
)

export default NewProjectModalContainer
