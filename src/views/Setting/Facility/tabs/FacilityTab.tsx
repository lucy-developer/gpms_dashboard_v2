import React, { PureComponent } from 'react';
import { IFacilityObj } from '@models/facility';
// import EditableTable from '@components/EditableTable/EditableTable';
import { ColumnProps, ColumnsType } from 'antd/lib/table';
// import {
//   getActionsColumn,
//   getColumn,
//   getEditableColumn
// } from '@components/EditableTable/columnHelpers';
import { Button, Divider, Row } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { IGateObj } from '@models/gate';
import { conversionEnumValue } from '@utils/conversion';
import { categoryOpt, delYnOpt, EDelYn, lprTypeTypeOpt } from '@/constants/list';
import StandardTable from '@components/StandardTable';
import { localeStore } from '@store/localeStore';
import zdsTips from '@utils/tips';
import DraggableModal from '@components/DraggableModal';
import { ISelectOptions } from '@utils/form';
import FacilityModal from '@views/Setting/Facility/tabs/modals/FacilityModal';

interface IProps {
  facilities: IFacilityObj[];
  gates: IGateObj[];
  loading: boolean;
  onUpdate: (info: IFacilityObj) => void;
  onCreate: (info: IFacilityObj) => void;
}

interface IState {
  detailModal: boolean;
  createModal: boolean;
  selected?: IFacilityObj;
  selectOptGates?: ISelectOptions[];
}

class FacilityTab extends PureComponent<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      detailModal: false,
      createModal: false
    };
  }
  componentDidMount() {
    this.gateListInit();
  }
  gateListInit = () => {
    const unique: ISelectOptions[] = [];
    this.props.gates
      .filter((gate: IGateObj) => {
        return gate.delYn !== EDelYn.Y;
      })
      .forEach((eGate) => unique.push({ value: eGate.gateId, label: eGate.gateName }));
    this.setState({ selectOptGates: unique });
  };

  handleCreateClick() {
    this.gateListInit();
    this.setState({ detailModal: false, createModal: true });
  }

  handleBtnClick = (info: IFacilityObj, key: string) => {
    const { localeObj } = localeStore;
    //console.log('handleBtnClick', info);
    if (key === 'delete') {
      zdsTips.confirm(localeObj['alert.delete'] || '?????? ????????? ??????(?????????) ???????????????????', () => {
        info.delYn = EDelYn.Y;
        this.props.onUpdate(info);
      });
    } else {
      this.gateListInit();
      this.setState({ detailModal: true, createModal: false, selected: info });
    }
  };

  render() {
    const { localeObj } = localeStore;
    const columns: ColumnProps<IFacilityObj>[] = [
      {
        title: '????????????',
        key: 'delYn',
        width: 100,
        align: 'center',
        filters: delYnOpt.map((r) => ({ text: r.label, value: r.value!! })),
        onFilter: (value, record) => record.delYn.indexOf(value as string) === 0,
        render: (text: string, record: IFacilityObj) => {
          const value = conversionEnumValue(record.delYn, delYnOpt);
          return <span style={{ color: value.color }}>{value.label}</span>;
        }
      },
      {
        title: '?????????',
        key: 'gate',
        width: 110,
        align: 'center',
        filters: this.props.gates.map((r) => ({ text: r.gateName, value: r.gateId })),
        onFilter: (value, record) => record.gateId.indexOf(value as string) === 0,
        render: (text: string, record: IFacilityObj) => {
          const value = this.props.gates.find((g) => g.gateId === record.gateId);
          return value ? value.gateName : text;
        }
      },
      {
        title: '?????? ID',
        key: 'dtFacilitiesId',
        width: 110,
        align: 'center',
        render: (text: string, record: IFacilityObj) => record.dtFacilitiesId
      },
      {
        title: '????????????',
        key: 'fname',
        width: 130,
        align: 'center',
        render: (text: string, record: IFacilityObj) => record.fname
      },
      {
        title: '????????????',
        key: 'category',
        width: 110,
        align: 'center',
        filters: categoryOpt.map((r) => ({ text: r.label, value: r.value!! })),
        onFilter: (value, record) => record.category.indexOf(value as string) === 0,
        render: (text: string, record: IFacilityObj) =>
          conversionEnumValue(record.category, categoryOpt).label
      },
      {
        title: '??????ID',
        key: 'modelid',
        width: 110,
        align: 'center',
        render: (text: string, record: IFacilityObj) => record.modelid
      },
      {
        title: 'IP',
        key: 'ip',
        width: 110,
        align: 'center',
        render: (text: string, record: IFacilityObj) => record.ip
      },
      {
        title: 'PORT',
        key: 'port',
        width: 110,
        align: 'center',
        render: (text: string, record: IFacilityObj) => record.port
      },
      {
        title: '??????',
        key: 'resetPort',
        width: 110,
        align: 'center',
        render: (text: string, record: IFacilityObj) => record.resetPort
      },
      {
        title: 'LPR ??????',
        key: 'lprType',
        width: 110,
        align: 'center',
        filters: lprTypeTypeOpt.map((r) => ({ text: r.label, value: r.value!! })),
        onFilter: (value, record) => record.lprType.indexOf(value as string) === 0,
        render: (text: string, record: IFacilityObj) =>
          conversionEnumValue(record.lprType, lprTypeTypeOpt).label
      },
      {
        title: '????????? path',
        key: 'imagePath',
        width: 110,
        align: 'center',
        render: (text: string, record: IFacilityObj) => record.imagePath
      },
      {
        title: 'Action',
        width: 100,
        align: 'center',
        fixed: 'right',
        render: (item: IFacilityObj) => (
          <div>
            <a
              onClick={(e: any) => {
                e.stopPropagation();
                this.handleBtnClick(item, 'edit');
              }}
            >
              <EditOutlined />
            </a>
            <Divider type="vertical" />
            <a
              onClick={(e: any) => {
                e.stopPropagation();
                this.handleBtnClick(item, 'delete');
              }}
            >
              <DeleteOutlined />
            </a>
          </div>
        )
      }
    ];
    return (
      <>
        <Row style={{ marginBottom: '1rem' }}>
          <Button
            type="primary"
            onClick={(e: any) => {
              e.stopPropagation();
              this.handleCreateClick();
            }}
          >
            + {localeObj['label.create'] || '?????? ??????'}
          </Button>
        </Row>
        <StandardTable
          scroll={{ x: 'max-content' }}
          columns={columns}
          loading={this.props.loading}
          // @ts-ignore
          rowKey={(record: IFacilityObj) => String(record.sn)}
          data={{ list: this.props.facilities }}
          hidePagination
        />
        {this.state.createModal ? (
          <DraggableModal
            title={localeObj['label.facility.info'] || '????????? ??????'}
            visible={this.state.createModal}
            onOk={(): void => {
              this.setState({ createModal: false });
            }}
            onCancel={(): void => {
              this.setState({ createModal: false });
            }}
            width={800}
            footer={[]}
          >
            <FacilityModal
              onSubmit={(value) => {
                this.setState({ createModal: false });
                this.props.onCreate(value);
              }}
              gate={this.state.selectOptGates}
            ></FacilityModal>
          </DraggableModal>
        ) : null}
        {this.state.detailModal ? (
          <DraggableModal
            title={localeObj['label.facility.info'] || '????????? ??????'}
            visible={this.state.detailModal}
            onOk={(): void => {
              this.setState({ detailModal: false });
            }}
            onCancel={(): void => {
              this.setState({ detailModal: false });
            }}
            width={800}
            footer={[]}
          >
            <FacilityModal
              onSubmit={(value) => {
                this.setState({ detailModal: false });
                this.props.onUpdate(value);
              }}
              gate={this.state.selectOptGates}
              facility={this.state.selected}
            ></FacilityModal>
          </DraggableModal>
        ) : null}
      </>
    );
  }
}

export default FacilityTab;
