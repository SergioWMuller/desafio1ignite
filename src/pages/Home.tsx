// Done and tested by Sergio Wanke Müller

import React, { useState } from 'react';
import { Alert } from 'react-native';
import { Header } from '../components/Header';
import { MyTasksList } from '../components/MyTasksList';
import { TodoInput } from '../components/TodoInput';

interface Task { // criando a interface com as propriedades id, title e done obrigatórios.
  id: number;
  title: string;
  done: boolean;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if (newTaskTitle === '') {  // verificando se a string está vazia.
      Alert.alert('Atention !', 'Insert what you have to do.');
      return
    }
    const data = {
      id: new Date().getTime(), // gerando um id baseado no momento de sua criação.
      title: newTaskTitle,
      done: false, // iniciando a propriedade done como false.
    }
    setTasks(oldState => [...oldState, data])
  }

  function handleMarkTaskAsDone(id: number) {
    //TODO - mark task as done if exists
    const task = tasks.filter((item) => item.id === id)[0];
    task.done = !task.done // alterando o boolean para o seu inverso.
    const newTasks = [...new Set([task, ...tasks])];
    setTasks(newTasks)
  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state
    setTasks(oldState => oldState.filter(
      task => task.id != id
    ));
  }

  return (
    <>
      <Header />

      <TodoInput addTask={handleAddTask} />

      <MyTasksList 
        tasks={tasks} 
        onPress={handleMarkTaskAsDone} 
        onLongPress={handleRemoveTask} 
      />
    </>
  )
}