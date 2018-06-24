// @flow
import React, { Component, Fragment } from 'react'
import { type Locale } from '@types/Locale'
import { type TranslationValue } from '@types/TranslationValue'
import Text from '@components/Text'
import Loader from '@components/Loader'
import Textarea from '@components/Textarea'
import { injectIntl, type Intl, FormattedMessage } from 'react-intl'
import PrefillValueContainer from '@containers/PrefillValueContainer'
import {
  ContentWrapper,
  LocaleWrapper,
  LoaderWrapper,
  PrefillButtonWrapper
} from './styles'

type Props = {
  intl: Intl,
  locale: Locale,
  translationKeyId: string,
  defaultTranslationKeyValue: TranslationValue | null,
  translationKeyValue: TranslationValue | null,
  onBlur: string => any,
  isLoading: boolean
}

type State = {
  isFocused: boolean
}

class TranslationValueRow extends Component<Props, State> {
  state = { isFocused: false }

  handleFocus = () => {
    this.setState(state => ({ isFocused: true }))
  }

  handleBlur = (value: string) => {
    this.setState(
      state => ({ isFocused: false }),
      () => this.props.onBlur(value)
    )
  }

  render() {
    const { isFocused } = this.state
    const {
      locale,
      translationKeyValue,
      defaultTranslationKeyValue,
      isLoading,
      translationKeyId
    } = this.props
    const { formatMessage } = this.props.intl
    const value = translationKeyValue ? translationKeyValue.value : ''
    const defaultLocaleValue = defaultTranslationKeyValue
      ? defaultTranslationKeyValue.value
      : ''

    return (
      <Fragment>
        <ContentWrapper isFocused={isFocused}>
          <LocaleWrapper>
            {locale.name} ({locale.code})
          </LocaleWrapper>
          <Textarea
            value={value}
            placeholder={formatMessage(
              {
                id: 'translation-row.placeholder'
              },
              { locale: locale.name }
            )}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          />
          {isLoading && (
            <LoaderWrapper>
              <Loader />
              <Text color="light">
                <FormattedMessage id="translation-value.saving" />
              </Text>
            </LoaderWrapper>
          )}
          {defaultLocaleValue &&
            !value &&
            defaultLocaleValue !== value && (
              <PrefillButtonWrapper>
                <PrefillValueContainer
                  localeId={locale.id}
                  translationKeyId={translationKeyId}
                  value={defaultLocaleValue}
                />
              </PrefillButtonWrapper>
            )}
        </ContentWrapper>
      </Fragment>
    )
  }
}

export default injectIntl(TranslationValueRow)
