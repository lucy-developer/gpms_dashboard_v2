import React, { PureComponent } from 'react';
import { inject, observer } from 'mobx-react';
import { IInoutObj, IInoutPaymentSelectReq, IInoutSelectReq } from '@models/inout';
import moment from 'moment';
import { delYnOpt, EInoutType, ETicketType, paymentTypeOpt, resultTypeOpt } from '@/constants/list';
import { getInoutPayments } from '@api/Inout';
import { runInAction } from 'mobx';
import { IInoutPaymentObj } from '@models/inoutPayment';
import Table, { ColumnProps } from 'antd/lib/table';
import {
  conversionDate,
  conversionEnumValue,
  convertNumberWithCommas,
  convertStringToDateTime
} from '@utils/conversion';
import { searchInoutPaymentFields } from '@views/Inout/List/FormFields/FormFields';
import PageWrapper from '@components/PageWrapper';
import SearchForm from '@components/StandardTable/SearchForm';
import StandardTable from '@components/StandardTable';
import { TablePaginationConfig } from 'antd/es/table';
import { localeStore } from '@store/localeStore';
import { Button, Col, Row } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { generateCsv } from '@utils/downloadUtil';
import DraggableModal from '@components/DraggableModal';
import ReceiptModal from '@views/Header/ReceiptModal';
import { IFacilityObj } from '@models/facility';
import { parkinglotStore } from '@store/parkinglotStore';

interface IProps {
  isModal?: boolean;
  pageSize?: number;
}

interface IState {
  loading: boolean;
  searchParam?: IInoutPaymentSelectReq;
  list: IInoutPaymentObj[];
  current: number;
  pageSize: number;
  total: number;
  selected?: IInoutPaymentObj;
  receiptModal: boolean;
}

@inject('parkinglotStore', 'localeStore')
@observer
class InoutPayment extends PureComponent<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: true,
      list: [],
      total: 0,
      current: 1,
      pageSize: this.props.pageSize ? this.props.pageSize : 20,
      receiptModal: false
    };
  }

  componentDidMount() {
    const createTm = [moment(new Date()).subtract(3, 'days'), moment(new Date())];
    const searchParam: IInoutPaymentSelectReq = {
      startDate: createTm[0].format('YYYY-MM-DD'),
      endDate: createTm[1].format('YYYY-MM-DD'),
      createTm: [createTm[0].unix(), createTm[1].unix()],
      vehicleNo: '',
      resultType: '',
      limit: 0
    };

    this.setState(
      {
        searchParam: searchParam
      },
      () => this.pollData()
    );
  }

  async pollData() {
    this.setState({ loading: true });
    getInoutPayments(this.state.searchParam)
      .then((res: any) => {
        const { msg, data } = res;
        if (msg === 'success') {
          runInAction(() => {
            // console.log(data);
            this.setState({
              // list: data.filter((l: any) => l.result !== 'WAIT'),
              list: data.filter((l: any) => l.amount > 0),
              total: data.length
            });
          });
        }
      })
      .catch(() => {})
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  getSearchData = (info: IInoutPaymentSelectReq) => {
    // console.log('getSearchData', info);
    const searchParam: IInoutPaymentSelectReq = {
      startDate: conversionDate(info.createTm[0]), //info.createTm[0].format('YYYY-MM-DD'),
      endDate: conversionDate(info.createTm[1]), //info.createTm[1].format('YYYY-MM-DD'),
      createTm: info.createTm,
      vehicleNo: info.vehicleNo === undefined ? '' : info.vehicleNo,
      resultType: info.resultType,
      limit: 0
    };
    this.setState({ searchParam: searchParam, current: 1 }, () => this.pollData());
  };

  paginationChange = (pagination: TablePaginationConfig) => {
    this.setState({ current: pagination.current || 1 });
  };

  addProdRender = () => {
    const { localeObj } = localeStore;
    const { isModal } = this.props;

    return isModal ? null : (
      <Row>
        <Col xs={7}>
          <Button
            style={{ marginLeft: '1rem' }}
            type="primary"
            onClick={(e: any) => {
              e.stopPropagation();
              this.handleDownloadClick();
            }}
          >
            <DownloadOutlined /> {localeObj['label.download'] || '????????????'}
          </Button>
        </Col>
      </Row>
    );
  };

  async handleDownloadClick() {
    const headers = [
      '????????????',
      '????????????',
      '????????????',
      '????????????',
      '????????????',
      '??????',
      '????????????',
      '????????????',
      '????????????'
    ].join(',');

    const downLoadData = this.state.list.map((record) => {
      const data: any = {};
      data.vehicleNo = record.vehicleNo;
      data.type = conversionEnumValue(record.type, paymentTypeOpt).label;
      data.approveDateTime = convertStringToDateTime(record.approveDateTime) || '--';
      data.amount = record.amount;
      data.payType = record.payType;
      data.cardCorp = record.cardCorp;
      data.cardNumber = record.cardNumber;
      data.transactionId = record.transactionId;
      data.result = record.result === 'SUCCESS' ? '??????' : `??????(${record.failureMessage})`;
      return data;
    });
    downLoadData.push({
      vehicleNo: '',
      type: '',
      approveDateTime: '',
      amount: this.sum(this.state.list, 'amount'),
      payType: '',
      cardCorp: '',
      cardNumber: '',
      transactionId: '',
      result: ''
    });
    await generateCsv(downLoadData, headers, '?????????????????????');
  }

  sum = (array: any[], key: string) => {
    return array.reduce((sum, item) => {
      return (sum += item[key]);
    }, 0);
  };

  render() {
    const columns: ColumnProps<IInoutPaymentObj>[] = [
      {
        title: '????????????',
        key: 'vehicleNo',
        fixed: 'left',
        width: 110,
        align: 'center',
        render: (text: string, record: IInoutPaymentObj) => record.vehicleNo
      },
      {
        title: '????????????',
        key: 'type',
        width: 110,
        align: 'center',
        render: (text: string, record: IInoutPaymentObj) =>
          conversionEnumValue(record.type, paymentTypeOpt).label
      },
      {
        title: '????????????',
        key: 'vehicleNo',
        width: 110,
        align: 'center',
        render: (text: string, record: IInoutPaymentObj) =>
          convertStringToDateTime(record.approveDateTime) || '--'
      },
      {
        title: '????????????',
        key: 'amount',
        width: 110,
        align: 'center',
        render: (text: string, record: IInoutPaymentObj) => convertNumberWithCommas(record.amount)
      },
      {
        title: '????????????',
        key: 'payType',
        width: 110,
        align: 'center',
        render: (text: string, record: IInoutPaymentObj) => record.payType
      },
      {
        title: '??????',
        key: 'cardCorp',
        width: 110,
        align: 'center',
        render: (text: string, record: IInoutPaymentObj) => record.cardCorp
      },
      {
        title: '????????????',
        key: 'cardNumber',
        width: 110,
        align: 'center',
        render: (text: string, record: IInoutPaymentObj) => record.cardNumber
      },
      {
        title: '????????????',
        key: 'transactionId',
        width: 110,
        align: 'center',
        render: (text: string, record: IInoutPaymentObj) => record.transactionId
      },
      {
        title: '????????????',
        key: 'result',
        width: 110,
        align: 'center',
        filters: resultTypeOpt.map((r) => ({ text: r.label, value: r.value!! })),
        onFilter: (value, record) => record.result.indexOf(value as string) === 0,
        render: (text: string, record: IInoutPaymentObj) => {
          const result = conversionEnumValue(record.result, resultTypeOpt).label;
          return record.result === 'ERROR' || result === 'FAILURE'
            ? `${result}(${record.failureMessage})`
            : result;
        }
      },
      {
        title: '?????????',
        width: 110,
        align: 'center',
        render: (text: string, record: IInoutPaymentObj) => {
          return (
            <Button onClick={(event) => this.setState({ selected: record, receiptModal: true })}>
              ?????????
            </Button>
          );
        }
      }
    ];
    const { list, total, current, pageSize } = this.state;
    const searchFields = searchInoutPaymentFields();
    return (
      <PageWrapper>
        <SearchForm
          submit={(value) => this.getSearchData(value)}
          fieldConfig={searchFields}
          footerRender={() => this.addProdRender()}
        />
        <StandardTable
          scroll={{ x: 'max-content', y: 800 }}
          columns={columns}
          loading={this.state.loading}
          // @ts-ignore
          rowKey={(record: IInoutPaymentObj) => String(record.sn)}
          data={{
            list,
            pagination: {
              total,
              current,
              pageSize,
              showSizeChanger: true,
              onShowSizeChange: (currentNum: any, size: any) => {
                this.setState({ pageSize: size });
                this.setState({ current: currentNum });
              }
            }
          }}
          summary={() => (
            <Table.Summary fixed>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0}>
                  <span style={{ fontSize: '15px', fontWeight: 600 }}>Total: {total}</span>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={1} />
                <Table.Summary.Cell index={2} />
                <Table.Summary.Cell index={3}>
                  <span style={{ fontSize: '14px', fontWeight: 600 }}>
                    {convertNumberWithCommas(this.sum(list, 'amount'))}
                  </span>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </Table.Summary>
          )}
          onChange={this.paginationChange}
          // isSelected
        />
        {this.state.receiptModal && this.state.selected ? (
          <DraggableModal
            title={'????????? ??????'}
            visible={this.state.receiptModal}
            width={500}
            onOk={() => this.setState({ receiptModal: false })}
            onCancel={(): void => {
              this.setState({ receiptModal: false });
            }}
          >
            <ReceiptModal payment={this.state.selected} />
          </DraggableModal>
        ) : null}
      </PageWrapper>
    );
  }
}

export default InoutPayment;
