import { observer } from 'mobx-react-lite';
import React from 'react';
import { Vibration } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { FlatList } from 'react-native-gesture-handler';
import { AnimatableManager, ListItem, Text, View } from 'react-native-ui-lib';
import Drawer from 'react-native-ui-lib/drawer';

import { useStore } from '../../stores/rootStore';
import { comMolIndex } from './utils';

function QuickAccess() {
  const R = useStore();

  const onDelete = (id: number) => {
    R.ho_units.qa.remove(id);
    Vibration.vibrate(40);
  };

  return (
    <View flexG>
      <Text text70M style={{ color: '#607d8b' }}>可爱的预设们~</Text>
      {
        R.ho_units.qa.presets.length === 0 ?
          <View centerV flexG>
            <View style={{ top: '-7%' }}>
              <Text center text60M grey30>点击按钮保存预设</Text>
              <View paddingV-3 />
              <Text center text60M grey30>长按加载&emsp;左滑移除</Text>
            </View>
          </View>
          :
          <FlatList
            data={R.ho_units.qa.presets}
            keyExtractor={(o) => o.s + o.t + o.m}
            renderItem={({ item: o, index }) =>
              <Drawer
                rightItems={[{
                  text: '移除',
                  background: '#e57373',
                  onPress: () => onDelete(index),
                }]}
              >
                <ListItem
                  centerV
                  paddingH-15
                  containerStyle={{ maxHeight: 50, backgroundColor: '#f3f3f3' }}
                  onLongPress={() => { Vibration.vibrate(20); R.ho_units.setS(o.s); R.ho_units.setT(o.t); R.ho_units.setMol(o.m); }}>
                  <Animatable.View
                    key={index}
                    style={{ alignSelf: 'center' }}
                    {...AnimatableManager.getZoomInSlideDown(index, {}, index)}>
                    <Text grey20 text70M>
                      {`${o.s} -> ${o.t}` + (!o.m ? '' : (comMolIndex.has(o.m) ? `  @${o.m.replace('*', '')}` : `  @ ${o.m} g/mol`))}
                    </Text>
                  </Animatable.View>
                </ListItem>
              </Drawer>}
          />
      }
    </View>
  );
}

export default observer(QuickAccess);
