// @flow
import React from 'react'
import qs from 'qs'
import { withRouter } from 'next/router'
import KeysFilters from '@components/KeysFilters'
import Button from '@components/Button'
import Input from '@components/Input'
import { Wrapper } from './styles'

type Props = {
  router: any,
  onAddKeyClick: () => any
}

class KeysHeader extends React.Component<Props> {
  onKeyUp = (e: any) => {
    const { router } = this.props
    const { keyCode, target } = e

    if (keyCode === 13 && Boolean(target.value)) {
      const queryString = qs.stringify({
        page: router.query.page,
        filters: router.filters ? router.filters.join(',') : [],
        search: target.value
      })
      router.push(`/project/${router.query.projectSlug}?${queryString}`)
    }
  }

  render() {
    const { onAddKeyClick } = this.props

    return (
      <Wrapper>
        <KeysFilters />
        <Input
          placeholder="Search for a key"
          name="search"
          onKeyUp={this.onKeyUp}
        />
        <Button bordered onClick={onAddKeyClick}>
          Add a new key
        </Button>
      </Wrapper>
    )
  }
}

export default withRouter(KeysHeader)
