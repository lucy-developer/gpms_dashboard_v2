import React, { PureComponent } from 'react';
import { inject, observer } from 'mobx-react';
import PageWrapper from '@components/PageWrapper';
import SearchForm from '@components/StandardTable/SearchForm';
import { IFailureObj, IFailureSearchReq } from '@models/failure';
import { conversionDate, conversionEnumValue } from '@utils/conversion';
import { getFailures } from '@api/failure';
import { runInAction } from 'mobx';
import { searchFailureFields } from '@views/Error/FailureFields';
import moment from 'moment';
import { IStatisticsInoutDaySearchReq } from '@models/statisticsInout';
import StandardTable from '@components/StandardTable';
import { TablePaginationConfig } from 'antd/es/table';
import { categoryOpt, failureCodeTypeOpt, ticketTypeOpt } from '@/constants/list';
import { trim } from 'lodash';
import { IFacilityObj } from '@models/facility';

interface IState {
  searchParam?: IFailureSearchReq;
  loading: boolean;
  list: IFailureObj[];
  current: number;
  pageSize: number;
  total: number;
}

@inject('parkinglotStore', 'localeStore')
@observer
class Error extends PureComponent<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
      list: [],
      total: 0,
      current: 1,
      pageSize: 20
    };
  }

  componentDidMount() {
    const createTm = [moment(new Date()).subtract(3, 'days'), moment(new Date())];
    const searchParam: IFailureSearchReq = {
      startDate: createTm[0].format('YYYY-MM-DD'),
      endDate: createTm[1].format('YYYY-MM-DD'),
      createTm: [createTm[0].unix(), createTm[1].unix()],
      category: ''
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
    getFailures(this.state.searchParam)
      .then((res: any) => {
        const { msg, data } = res;
        if (msg === 'success') {
          runInAction(() => {
            // console.log(data);
            this.setState({ list: data, total: data.length });
          });
        }
      })
      .catch(() => {})
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  getSearchData = (info: IFailureSearchReq) => {
    const searchParam: IFailureSearchReq = {
      startDate: conversionDate(info.createTm[0]), //info.createTm[0].format('YYYY-MM-DD'),
      endDate: conversionDate(info.createTm[1]), //info.createTm[1].format('YYYY-MM-DD'),
      createTm: info.createTm,
      category: info.category
    };
    this.setState({ searchParam: searchParam }, () => this.pollData());
  };

  paginationChange = (pagination: TablePaginationConfig) => {
    this.setState({ current: pagination.current || 1 });
  };

  render() {
    const searchFields = searchFailureFields();
    const columns = [
      {
        title: '????????????',
        key: 'resolved',
        width: 110,
        align: 'center',
        render: (text: string, record: IFailureObj) => {
          const status = record.expireDateTime ? '??????' : '?????????';
          return {
            props: {
              style: {
                color: status === '?????????' ? 'red' : 'black'
              }
            },
            children: <div>{status}</div>
          };
        }
      },
      {
        title: '????????????',
        dataIndex: 'issueDateTime',
        key: 'issueDateTime',
        width: 110,
        align: 'center',
        render: (text: string, record: IFailureObj) => {
          return record.issueDateTime
            ? moment(record.issueDateTime).format('YYYY-MM-DD HH:mm')
            : null;
        }
      },
      {
        title: '????????????',
        key: 'gateName',
        width: 100,
        align: 'center',
        render: (text: string, record: IFailureObj) => record.gateName
      },
      {
        title: '????????????',
        key: 'category',
        width: 110,
        align: 'center',
        // filters: categoryOpt.map((r) => ({ text: r.label, value: r.value!! })),
        //onFilter: (value, record) => record.category.indexOf(value as string) === 0,
        render: (text: string, record: IFailureObj) =>
          conversionEnumValue(record.category, categoryOpt).label
      },
      {
        title: '?????????',
        key: 'fname',
        width: 100,
        align: 'center',
        render: (text: string, record: IFailureObj) => record.fname
      },
      {
        title: '??????ID',
        key: 'fname',
        width: 100,
        align: 'center',
        render: (text: string, record: IFailureObj) => record.facilitiesId
      },
      {
        title: '????????????',
        key: 'failureCode',
        width: 100,
        align: 'center',
        render: (text: string, record: IFailureObj) => {
          return conversionEnumValue(trim(record.failureCode), failureCodeTypeOpt).label;
        }
      },
      {
        title: '????????????',
        dataIndex: 'expireDateTime',
        key: 'expireDateTime',
        width: 110,
        align: 'center',
        render: (text: string, record: IFailureObj) => {
          return record.expireDateTime
            ? moment(record.expireDateTime).format('YYYY-MM-DD HH:mm')
            : null;
        }
      }
    ];
    const { list, total, current, pageSize } = this.state;
    return (
      <PageWrapper>
        <SearchForm
          submit={(value) => this.getSearchData(value)}
          location={this.props.location}
          // footerRender={() => this.addProdRender()}
          fieldConfig={searchFields}
        />
        <StandardTable
          scroll={{ x: 'max-content', y: 800 }}
          columns={columns}
          loading={this.state.loading}
          // @ts-ignore
          rowKey={(record: IFailureObj) => String(record.sn)}
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
          onChange={this.paginationChange}
        />
      </PageWrapper>
    );
  }
}

export default Error;
