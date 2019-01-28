import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl, defineMessages, FormattedMessage } from 'react-intl'
import { compose } from 'lodash/fp'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import NumberFormat from 'react-number-format'

import Layout from '$comp/layout'

import contentFormStyle from '$styles/content-form'

const messages = defineMessages({
  pageTitle: {
    id: 'ads.new.pageTitle',
    defaultMessage: 'New Ad'
  },
  title: {
    id: 'ads.new.title',
    defaultMessage: 'Ad title'
  },
  titleHelp: {
    id: 'ads.new.titleHelp',
    defaultMessage: 'Create a short concise title describing the product.'
  },
  desc: {
    id: 'ads.new.desc',
    defaultMessage: 'Ad description'
  },
  descHelp: {
    id: 'ads.new.descHelp',
    defaultMessage: 'Describe the product in detail, with minus, if any. Be honest, people will like it.'
  },
  price: {
    id: 'ads.new.price',
    defaultMessage: 'Price'
  },
  nego: {
    id: 'ads.new.nego',
    defaultMessage: 'Nego'
  },
  submit: {
    id: 'ads.new.submit',
    defaultMessage: 'Submit'
  }
})

const styles = theme => ({
  content: contentFormStyle(theme),
  help: {
    ...tw`flex justify-between`,
    '& > :first-child': tw`mr-3`
  },
  priceRow: {
    ...tw`flex items-end`,
    '& > :first-child': tw`mr-4`
  },
  price: {
    '& input': tw`text-right`
  },
  actions: tw`mt-6`
})

// eslint-disable-next-line react/prop-types
const CurrencyFormat = ({ inputRef, onChange, ...other }) => (
  <NumberFormat
    {...other}
    getInputRef={inputRef}
    onValueChange={values => onChange(values.floatValue)}
    thousandSeparator
    isAllowed={values => values.floatValue <= 1e14 || values.value === ''}
    allowNegative={false}
  />
)

const Help = withStyles(styles)(
  ({ classes, text, length, maxLength }) => (
    <span className={classes.help}>
      <span>{text}</span>
      <span>{length} / {maxLength}</span>
    </span>
  )
)

class PasangIklanPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      desc: '',
      price: '',
      nego: false
    }
  }

  onInputChange = name => e => this.setState({ [name]: e.target.value })

  onCheckedChange = name => e => this.setState({ [name]: e.target.checked })

  onValueChange = name => val => this.setState({ [name]: val })

  onSubmit = e => {
    e.preventDefault()
    console.log('submit')
  }

  render () {
    const { classes, intl } = this.props
    const { title, desc, price, nego } = this.state
    return (
      <Layout>
        <div className={classes.content}>
          <form onSubmit={this.onSubmit}>
            <Typography variant='h4' gutterBottom>
              <FormattedMessage {...messages.pageTitle} />
            </Typography>
            <TextField
              label={intl.formatMessage(messages.title)}
              fullWidth
              margin='normal'
              inputProps={{ maxLength: 70 }}
              value={title}
              onChange={this.onInputChange('title')}
              helperText={
                <Help
                  text={intl.formatMessage(messages.titleHelp)}
                  length={title.length}
                  maxLength={70}
                />
              }
            />
            <TextField
              label={intl.formatMessage(messages.desc)}
              multiline
              rows={5}
              rowsMax={20}
              fullWidth
              margin='normal'
              inputProps={{ maxLength: 4000 }}
              value={desc}
              onChange={this.onInputChange('desc')}
              helperText={
                <Help
                  text={intl.formatMessage(messages.descHelp)}
                  length={desc.length}
                  maxLength={4000}
                />
              }
            />
            <div className={classes.priceRow}>
              <TextField
                label={intl.formatMessage(messages.price)}
                margin='normal'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>Rp</InputAdornment>
                  ),
                  inputComponent: CurrencyFormat
                }}
                value={price}
                onChange={this.onValueChange('price')}
                className={classes.price}
              />
              <FormControlLabel
                label={intl.formatMessage(messages.nego)}
                control={
                  <Checkbox
                    checked={nego}
                    onChange={this.onCheckedChange('nego')}
                  />
                }
              />
            </div>
            <div className={classes.actions}>
              <Button type='submit' variant='contained' color='primary'>
                <FormattedMessage {...messages.submit} />
              </Button>
            </div>
          </form>
        </div>
      </Layout>
    )
  }
}

PasangIklanPage.propTypes = {
  classes: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
}

export default compose(
  withStyles(styles),
  injectIntl
)(PasangIklanPage)