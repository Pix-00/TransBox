import { observer } from 'mobx-react-lite';
import React from 'react';
import { Vibration } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { ListItem, Text, View } from 'react-native-ui-lib';
import Drawer from 'react-native-ui-lib/drawer';

import { useStore } from '../../stores/rootStore';

function QuickAccess() {
  const R = useStore();

  const onDelete = (id: number) => {
    R.ho_units.qa.remove(id);
    Vibration.vibrate(40);
  };

  return (
    <View flexG>
      <Text text70M style={{ color: '#607d8b' }}>可爱的预设们~</Text>
      {R.ho_units.qa.presets.length !== 0
        ?
        <FlatList
          data={R.ho_units.qa.presets}
          keyExtractor={(o) => o.s + o.t + o.m}
          renderItem={({ item: o, index }) =>
            <Drawer
              rightItems={[{
                text: '移除',
                onPress: () => onDelete(index)
              }]}
            >
              <ListItem
                centerV
                paddingH-15
                containerStyle={{ maxHeight: 50, backgroundColor: '#f3f3f3' }}
                onLongPress={() => { Vibration.vibrate(20); R.ho_units.setS(o.s); R.ho_units.setT(o.t); R.ho_units.setMol(o.m); }}>
                <ListItem.Part>
                  <Text grey20 text70M>{o.s + ' -> ' + o.t + (o.m !== '0' ? '  @' + o.m : '')} </Text>
                </ListItem.Part>
              </ListItem>
            </Drawer>
          }
        />
        :
        <View centerV flexG>
          <View style={{ top: '-7%' }}>
            <Text center text60M grey30 >点击按钮保存预设</Text>
            <View paddingV-3 />
            <Text center text60M grey30 >长按加载&emsp;左滑移除</Text>
          </View>
        </View>
      }
    </View>
  );
}

export default observer(QuickAccess);
