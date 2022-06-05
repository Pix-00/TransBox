import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native-ui-lib/core';

import Header from '../../components/Header';
import Bottom from './Bottom';
import MolInput from './MolInput';
import Output from './Output';
import QuickAccess from './QuickAccess';
import Source from './Source';
import UnitDiag from './UnitDiag';

function Index() {
  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={{ flexGrow: 1 }}>
      <Header />
      <View flexG style={{ margin: '7%' }}>
        <Source />
        <MolInput />
        <Output />
        <UnitDiag />
        <View marginV-20 height={1.5} bg-dark60 />
        <QuickAccess />
      </View>
      <Bottom />
    </SafeAreaView>
  );
}


export default Index;