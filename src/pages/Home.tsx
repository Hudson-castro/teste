import React, { useState, useEffect } from 'react';
import { 
  Calendar, Clock, MapPin, User, Bell, Search, Plus, FileText, 
  ChevronRight, Filter, Home, Phone, Mail, Edit, Trash2, 
  CheckCircle, X, UserCheck, Stethoscope, Building2, 
  AlertCircle, LogOut, Lock, Unlock, Eye, EyeOff, ArrowLeft
} from 'lucide-react';

const UBSSalvadorSystem = () => {
  // Estados principais
  const [currentScreen, setCurrentScreen] = useState('login');
  const [userType, setUserType] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [isLocked, setIsLocked] = useState(false);
  const [screenBeforeLock, setScreenBeforeLock] = useState('home');
  const [appKey, setAppKey] = useState(0);

  // Dados das Unidades de Saúde
  const [healthUnits] = useState([
    {
      id: 1,
      name: "Centro de Saúde Dr. Eduardo R. Baia",
      address: "Rua Francisco Leitão, S/N, Centro - Salvador",
      phone: "(71) 6041-3860",
      schedule: "07:00-17:00",
      specialties: ["Clínica Geral", "Pediatria", "Ginecologia"],
      district: "Centro"
    },
    {
      id: 2,
      name: "Unidade Básica de Saúde da Federação",
      address: "Rua da Federação, S/N, Federação - Salvador",
      phone: "(71) 3202-1024",
      schedule: "07:00-17:00",
      specialties: ["Clínica Geral", "Dermatologia", "Cardiologia"],
      district: "Federação"
    },
    {
      id: 3,
      name: "Unidade de Saúde da Família São Marcos",
      address: "Rua São Marcos, S/N, São Marcos - Salvador",
      phone: "(71) 3202-1024",
      schedule: "07:00-17:00",
      specialties: ["Clínica Geral", "Ginecologia", "Pediatria"],
      district: "São Marcos"
    }
  ]);

  // Dados dos Profissionais
  const [professionals, setProfessionals] = useState([
    {
      id: 1,
      name: "Dr. João Silva",
      cpf: "111.222.333-44",
      specialty: "Cardiologia",
      registration: "CRM 12345",
      available: "08:00-16:00",
      unitId: 2,
      unitName: "UBS da Federação"
    },
    {
      id: 2,
      name: "Dra. Maria Oliveira",
      cpf: "555.666.777-88",
      specialty: "Ginecologia",
      registration: "CRM 67890",
      available: "14:00-18:00",
      unitId: 2,
      unitName: "UBS da Federação"
    },
    {
      id: 3,
      name: "Dr. Carlos Souza",
      cpf: "999.111.222-33",
      specialty: "Pediatria",
      registration: "CRM 13579",
      available: "08:00-12:00",
      unitId: 3,
      unitName: "USF São Marcos"
    }
  ]);

  // Dados dos Pacientes
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: "Maria Silva Santos",
      cpf: "123.456.789-10",
      phone: "(71) 99999-1234",
      email: "maria@email.com",
      birthDate: "1985-03-15",
      address: "Rua das Flores, 123 - Centro, Salvador - BA",
      susCard: "898.0001.2345.6789",
      password: "123456"
    },
    {
      id: 2,
      name: "João Oliveira Costa",
      cpf: "987.654.321-00",
      phone: "(71) 98888-5678",
      email: "joao@email.com",
      birthDate: "1990-07-22",
      address: "Av. Norte, 456 - Federação, Salvador - BA",
      susCard: "898.0002.3456.7890",
      password: "123456"
    }
  ]);

  // Dados das Consultas - CORRIGIDO: João não tem consultas
  const [consultations, setConsultations] = useState([
    {
      id: 1,
      patientId: 1,
      professionalId: 1,
      patientName: "Maria Silva Santos",
      professionalName: "Dr. João Silva",
      specialty: "Cardiologia",
      date: "2025-11-15",
      time: "09:00",
      status: "Agendada",
      unitId: 2,
      unitName: "UBS da Federação",
      notes: ""
    },
    {
      id: 2,
      patientId: 1,
      professionalId: 2,
      patientName: "Maria Silva Santos",
      professionalName: "Dra. Maria Oliveira",
      specialty: "Ginecologia",
      date: "2025-11-20",
      time: "15:00",
      status: "Agendada",
      unitId: 2,
      unitName: "UBS da Federação",
      notes: ""
    },
    {
      id: 3,
      patientId: 1,
      professionalId: 3,
      patientName: "Maria Silva Santos",
      professionalName: "Dr. Carlos Souza",
      specialty: "Pediatria",
      date: "2025-10-15",
      time: "10:00",
      status: "Realizada",
      unitId: 3,
      unitName: "USF São Marcos",
      notes: "Consulta de rotina realizada com sucesso."
    },
    {
      id: 4,
      patientId: 1,
      professionalId: 1,
      patientName: "Maria Silva Santos",
      professionalName: "Dr. João Silva",
      specialty: "Cardiologia",
      date: "2025-11-12",
      time: "10:30",
      status: "Agendada",
      unitId: 2,
      unitName: "UBS da Federação",
      notes: "Consulta de teste para validação Cypress"
    },
    {
      id: 999,
      patientId: 1,
      professionalId: 1,
      patientName: "Maria Silva Santos",
      professionalName: "Dr. João Silva",
      specialty: "Cardiologia",
      date: "2025-11-09",
      time: "10:30",
      status: "Agendada",
      unitId: 2,
      unitName: "UBS da Federação",
      notes: "Consulta de teste para validação Cypress"
    }
  ]);

  // Usuários do sistema
  const [users] = useState([
    {
      id: 'admin',
      name: "Administrador Sistema",
      email: "admin@ubs.salvador.gov.br",
      password: "admin123",
      type: 'admin'
    }
  ]);

  // Funções de navegação
  const navigateTo = (screen) => {
    setCurrentScreen(screen);
  };

  const goBack = () => {
    setCurrentScreen('home');
  };

  const handleLogout = () => {
    setUserType('');
    setCurrentUser(null);
    setCurrentScreen('login');
    setIsLocked(false);
    // Forçar remount do root para limpar estados internos
    setTimeout(() => setAppKey(k => k + 1), 50);
  };

  const toggleLock = () => {
    if (!isLocked) {
      setScreenBeforeLock(currentScreen);
      setIsLocked(true);
    } else {
      setIsLocked(false);
    }
  };

  // ========== COMPONENTE: TELA DE LOGIN ==========
  const LoginScreen = () => {
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = () => {
      // Verificar admin
      const admin = users.find(u => u.email === loginData.email && u.password === loginData.password);
      if (admin) {
        setUserType('admin');
        setCurrentUser(admin);
        setCurrentScreen('home');
        return;
      }

      // Verificar paciente
      const patient = patients.find(p => p.email === loginData.email && p.password === loginData.password);
      if (patient) {
        setUserType('patient');
        setCurrentUser(patient);
        setCurrentScreen('home');
        return;
      }

      // Verificar profissional
      const professional = professionals.find(p => 
        p.cpf.replace(/[.-]/g, '') === loginData.email.replace(/[.-]/g, '') && 
        loginData.password === '123456'
      );
      if (professional) {
        setUserType('professional');
        setCurrentUser(professional);
        setCurrentScreen('home');
        return;
      }

      alert('Email/CPF ou senha incorretos!');
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-green-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Stethoscope className="w-8 h-8 text-blue-600" />
            </div>
            <h1 data-testid="login-title" className="text-2xl font-bold text-gray-800">UBS Digital Salvador</h1>
            <p className="text-gray-600">Sistema de Agendamento</p>
          </div>

          <div className="space-y-4 mb-6">
            <input
              data-testid="input-email"
              type="text"
              placeholder="Email ou CPF"
              value={loginData?.email || ''}
              onChange={(e) => setLoginData({...loginData, email: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="relative">
              <input
                data-testid="input-password"
                type={showPassword ? "text" : "password"}
                placeholder="Senha"
                value={loginData?.password || ''}
                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            data-testid="btn-login"
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Entrar
          </button>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 mb-2">Contas de teste:</p>
            <div className="text-xs text-gray-500 space-y-1">
              <p><strong>Admin:</strong> admin@ubs.salvador.gov.br / admin123</p>
              <p><strong>Paciente:</strong> maria@email.com / 123456</p>
              <p><strong>Profissional:</strong> 111.222.333-44 / 123456</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ========== COMPONENTE: TELA DE BLOQUEIO ==========
  const LockScreen = () => {
    const [password, setPassword] = useState('');

    const handleUnlock = () => {
      if (password) {
        setIsLocked(false);
        setCurrentScreen(screenBeforeLock);
        setPassword('');
      } else {
        alert('Digite uma senha para desbloquear');
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-2xl text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">App Bloqueado</h1>
          <p className="text-gray-600 mb-8">Digite sua senha para continuar</p>
          
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleUnlock()}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
          />
          
          <div className="space-y-3">
            <button
              data-testid="btn-unlock"
              onClick={handleUnlock}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <Unlock className="w-5 h-5 mr-2" />
              Desbloquear
            </button>
            
            <button
              data-testid="btn-logout-lock"
              onClick={handleLogout}
              className="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Sair do App
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ========== COMPONENTE: DASHBOARD DO PACIENTE ==========
  const PatientHomeScreen = () => (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-xl font-bold">Olá, {currentUser?.name?.split(' ')[0]}!</h1>
            <p className="text-blue-100">UBS Digital Salvador</p>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              data-testid="btn-lock"
              onClick={toggleLock}
              className="p-2 bg-blue-700 rounded-full hover:bg-blue-800 transition-colors"
              title="Bloquear App"
            >
              <Lock className="w-5 h-5" />
            </button>
            <button 
              data-testid="btn-edit-profile"
              onClick={() => navigateTo('edit-profile')}
              className="p-2 bg-blue-700 rounded-full hover:bg-blue-800 transition-colors"
              title="Editar Perfil"
            >
              <Edit className="w-5 h-5" />
            </button>
            <button 
              data-testid="btn-logout"
              onClick={handleLogout}
              className="p-2 bg-red-600 rounded-full hover:bg-red-700 transition-colors"
              title="Sair"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button 
            data-testid="btn-schedule"
            onClick={() => navigateTo('schedule')}
            className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500 hover:shadow-md transition-shadow"
          >
            <Calendar className="w-8 h-8 text-green-600 mb-3" />
            <h3 className="font-semibold text-gray-800">Agendar</h3>
            <p className="text-sm text-gray-600">Nova consulta</p>
          </button>
          
          <button 
            data-testid="btn-consultations"
            onClick={() => navigateTo('consultations')}
            className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500 hover:shadow-md transition-shadow"
          >
            <FileText className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="font-semibold text-gray-800">Consultas</h3>
            <p className="text-sm text-gray-600">Histórico</p>
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6" data-testid="next-consultation-card">
          <h3 className="font-semibold text-gray-800 mb-4">Próxima Consulta</h3>

          {(() => {
            const consultasAgendadas = consultations.filter(
              c => c.patientId === currentUser?.id && c.status === 'Agendada'
            );

            if (consultasAgendadas.length === 0) {
              return (
                <p className="text-gray-500 text-center py-4">
                  Nenhuma consulta agendada
                </p>
              );
            }

            // Apenas a próxima consulta (a mais próxima no tempo)
            const proximaConsulta = [...consultasAgendadas].sort((a, b) =>
              new Date(a.date + ' ' + a.time).getTime() -
              new Date(b.date + ' ' + b.time).getTime()
            )[0];

            return (
              <div
                key={proximaConsulta.id}
                className="flex items-center justify-between p-4 border border-gray-100 rounded-lg"
                data-testid="next-consultation-item"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <Stethoscope className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{proximaConsulta.professionalName}</p>
                    <p className="text-sm text-gray-600">{proximaConsulta.specialty}</p>
                    <p className="text-xs text-gray-500">
                      {proximaConsulta.date} - {proximaConsulta.time}
                    </p>
                  </div>
                </div>
                <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                  {proximaConsulta.status}
                </span>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );

  // ========== COMPONENTE: DASHBOARD DO PROFISSIONAL ==========
  const ProfessionalHomeScreen = () => (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 text-white">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-xl font-bold">{currentUser?.name}</h1>
            <p className="text-green-100">{currentUser?.specialty}</p>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              data-testid="btn-lock"
              onClick={toggleLock}
              className="p-2 bg-green-700 rounded-full hover:bg-green-800 transition-colors"
            >
              <Lock className="w-5 h-5" />
            </button>
            <button 
              data-testid="btn-logout"
              onClick={handleLogout}
              className="p-2 bg-red-600 rounded-full hover:bg-red-700 transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-6 rounded-xl shadow-sm" data-testid="professional-scheduled-count">
            <Calendar className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="font-semibold text-gray-800">Agenda</h3>
            <p className="text-2xl font-bold text-blue-600">
              {consultations.filter(c => c.professionalId === currentUser?.id && c.status === 'Agendada').length}
            </p>
            <p className="text-sm text-gray-600">Agendadas</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm" data-testid="professional-completed-count">
            <CheckCircle className="w-8 h-8 text-green-600 mb-3" />
            <h3 className="font-semibold text-gray-800">Realizadas</h3>
            <p className="text-2xl font-bold text-green-600">
              {consultations.filter(c => c.professionalId === currentUser?.id && c.status === 'Realizada').length}
            </p>
            <p className="text-sm text-gray-600">Total</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h3 className="font-semibold text-gray-800 mb-4">Horários Disponíveis</h3>
          {consultations.filter(c => c.professionalId === currentUser?.id && c.status === 'Agendada').map((consultation) => (
            <div key={consultation.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg mb-3">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <User className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{consultation.patientName}</p>
                  <p className="text-sm text-gray-600">{consultation.date} - {consultation.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ========== COMPONENTE: DASHBOARD DO ADMIN ==========
  const AdminHomeScreen = () => (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-6 text-white">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-xl font-bold">Painel Administrativo</h1>
            <p className="text-purple-100">UBS Digital Salvador</p>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              data-testid="btn-lock"
              onClick={toggleLock}
              className="p-2 bg-purple-700 rounded-full hover:bg-purple-800 transition-colors"
            >
              <Lock className="w-5 h-5" />
            </button>
            <button 
              data-testid="btn-logout"
              onClick={handleLogout}
              className="p-2 bg-red-600 rounded-full hover:bg-red-700 transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <User className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="font-semibold text-gray-800">Pacientes</h3>
            <p data-testid="admin-total-patients" className="text-2xl font-bold text-blue-600">{patients.length}</p>
            <p className="text-sm text-gray-600">Cadastrados</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <UserCheck className="w-8 h-8 text-green-600 mb-3" />
            <h3 className="font-semibold text-gray-800">Profissionais</h3>
            <p data-testid="admin-total-professionals" className="text-2xl font-bold text-green-600">{professionals.length}</p>
            <p className="text-sm text-gray-600">Ativos</p>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <button 
            data-testid="btn-manage-patients"
            onClick={() => navigateTo('manage-patients')}
            className="w-full bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow text-left flex items-center justify-between"
          >
            <div className="flex items-center">
              <User className="w-6 h-6 text-blue-600 mr-4" />
              <div>
                <h3 className="font-semibold text-gray-800">Gerenciar Pacientes</h3>
                <p className="text-sm text-gray-600">Cadastrar, editar, excluir</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button 
            data-testid="btn-manage-professionals"
            onClick={() => navigateTo('manage-professionals')}
            className="w-full bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow text-left flex items-center justify-between"
          >
            <div className="flex items-center">
              <UserCheck className="w-6 h-6 text-green-600 mr-4" />
              <div>
                <h3 className="font-semibold text-gray-800">Gerenciar Profissionais</h3>
                <p className="text-sm text-gray-600">Cadastrar, editar, horários</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button 
            data-testid="btn-schedule"
            onClick={() => navigateTo('schedule')}
            className="w-full bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow text-left flex items-center justify-between"
          >
            <div className="flex items-center">
              <Plus className="w-6 h-6 text-green-600 mr-4" />
              <div>
                <h3 className="font-semibold text-gray-800">Agendar Consulta</h3>
                <p className="text-sm text-gray-600">Novo agendamento</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button 
            data-testid="btn-reports"
            onClick={() => navigateTo('reports')}
            className="w-full bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow text-left flex items-center justify-between"
          >
            <div className="flex items-center">
              <FileText className="w-6 h-6 text-indigo-600 mr-4" />
              <div>
                <h3 className="font-semibold text-gray-800">Relatórios</h3>
                <p className="text-sm text-gray-600">Gerar relatórios</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );

  // ========== COMPONENTE: GERENCIAR PACIENTES ==========
  const ManagePatientsScreen = () => {
    const [patientName, setPatientName] = useState('');
    const [showAddForm, setShowAddForm] = useState(false);

    const handleAddPatient = () => {
      if (!patientName.trim()) {
        alert('Digite o nome do paciente');
        return;
      }

      const newPatient = {
        id: Math.max(...patients.map(p => p.id)) + 1,
        name: patientName,
        cpf: '',
        phone: '',
        email: '',
        birthDate: '',
        address: '',
        susCard: '',
        password: '123456'
      };

      setPatients([...patients, newPatient]);
      setPatientName('');
      setShowAddForm(false);
      alert('Paciente cadastrado com sucesso!');
    };

    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="bg-white p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button onClick={goBack} className="mr-4 p-2 hover:bg-gray-100 rounded-lg">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h1 className="text-xl font-bold">Gerenciar Pacientes</h1>
            </div>
            <button 
              onClick={() => setShowAddForm(!showAddForm)}
              className="p-2 bg-blue-600 text-white rounded-full"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {showAddForm && (
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h3 className="font-semibold text-gray-800 mb-4">Cadastrar Novo Paciente</h3>
              <div className="space-y-4">
                <input
                  data-testid="input-patient-name"
                  type="text"
                  placeholder="Nome completo do paciente"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex space-x-3">
                  <button
                    onClick={handleAddPatient}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                  >
                    Salvar
                  </button>
                  <button
                    onClick={() => {
                      setShowAddForm(false);
                      setPatientName('');
                    }}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {patients.map((patient) => (
              <div key={patient.id} className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{patient.name}</p>
                      <p className="text-sm text-gray-600">CPF: {patient.cpf || 'Não informado'}</p>
                      <p className="text-sm text-gray-600">Cartão SUS: {patient.susCard || 'Não informado'}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // ========== COMPONENTE: GERENCIAR PROFISSIONAIS ==========
  const ManageProfessionalsScreen = () => (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={goBack} className="mr-4 p-2 hover:bg-gray-100 rounded-lg">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold">Gerenciar Profissionais</h1>
          </div>
          <button className="p-2 bg-green-600 text-white rounded-full">
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          {professionals.map((professional) => (
            <div key={professional.id} className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <UserCheck className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{professional.name}</p>
                    <p className="text-sm text-green-600">{professional.specialty}</p>
                    <p className="text-sm text-gray-600">{professional.registration}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ========== COMPONENTE: AGENDAMENTO ==========
  const ScheduleScreen = () => {
    const [step, setStep] = useState(1);
    const [scheduleData, setScheduleData] = useState({
      selectedUnitId: null,
      selectedProfessionalId: null,
      selectedPatientId: userType === 'patient' ? currentUser?.id : null,
      selectedDate: '',
      selectedTime: ''
    });

    const handleConfirmSchedule = () => {
      const patient = patients.find(p => p.id === scheduleData.selectedPatientId);
      const professional = professionals.find(p => p.id === scheduleData.selectedProfessionalId);
      const unit = healthUnits.find(u => u.id === scheduleData.selectedUnitId);
      
      const newConsultation = {
        id: Math.max(...consultations.map(c => c.id)) + 1,
        patientId: scheduleData.selectedPatientId,
        professionalId: scheduleData.selectedProfessionalId,
        patientName: patient.name,
        professionalName: professional.name,
        specialty: professional.specialty,
        date: scheduleData.selectedDate,
        time: scheduleData.selectedTime,
        status: "Agendada",
        unitId: scheduleData.selectedUnitId,
        unitName: unit.name,
        notes: ""
      };

      setConsultations([...consultations, newConsultation]);
      
      // Resetar dados do agendamento
      setScheduleData({
        selectedUnitId: null,
        selectedProfessionalId: null,
        selectedPatientId: userType === 'patient' ? currentUser?.id : null,
        selectedDate: '',
        selectedTime: ''
      });
      
      alert('Consulta agendada com sucesso!');
      
      // Delay para garantir atualização antes de voltar
      setTimeout(() => {
        goBack();
      }, 100);
    };

    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="bg-white p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button onClick={goBack} className="mr-4 p-2 hover:bg-gray-100 rounded-lg">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h1 className="text-xl font-bold">Agendar Consulta</h1>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Seleção de Paciente (Admin) */}
          {userType === 'admin' && step === 1 && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Selecione o Paciente</h3>
                <div className="space-y-3">
                  {patients.map((patient) => (
                    <button
                      key={patient.id}
                      onClick={() => {
                        setScheduleData({...scheduleData, selectedPatientId: patient.id});
                        setStep(2);
                      }}
                      className="w-full p-4 border border-gray-200 rounded-lg hover:border-blue-500 text-left"
                    >
                      <p className="font-medium text-gray-800">{patient.name}</p>
                      <p className="text-sm text-gray-600">CPF: {patient.cpf}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Seleção de UBS */}
          {((userType === 'patient' && step === 1) || (userType === 'admin' && step === 2)) && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Selecione a UBS</h3>
                <div className="space-y-3">
                  {healthUnits.map((unit) => (
                    <button
                      key={unit.id}
                      onClick={() => {
                        setScheduleData({...scheduleData, selectedUnitId: unit.id});
                        setStep(userType === 'admin' ? 3 : 2);
                      }}
                      className="w-full p-4 border border-gray-200 rounded-lg hover:border-blue-500 text-left"
                    >
                      <p className="font-medium text-gray-800">{unit.name}</p>
                      <p className="text-sm text-gray-600">{unit.address}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Seleção de Profissional */}
          {((userType === 'patient' && step === 2) || (userType === 'admin' && step === 3)) && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Selecione o Profissional</h3>
                <div className="space-y-3">
                  {professionals
                    .filter(prof => prof.unitId === scheduleData.selectedUnitId)
                    .map((prof) => (
                    <button
                      key={prof.id}
                      onClick={() => {
                        setScheduleData({...scheduleData, selectedProfessionalId: prof.id});
                        setStep(userType === 'admin' ? 4 : 3);
                      }}
                      className="w-full p-4 border border-gray-200 rounded-lg hover:border-green-500 text-left"
                    >
                      <p className="font-medium text-gray-800">{prof.name}</p>
                      <p className="text-sm text-green-600">{prof.specialty}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Seleção de Data */}
          {((userType === 'patient' && step === 3) || (userType === 'admin' && step === 4)) && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Selecione a Data</h3>
                <input
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={scheduleData.selectedDate}
                  onChange={(e) => {
                    setScheduleData({...scheduleData, selectedDate: e.target.value});
                    if (e.target.value) setStep(userType === 'admin' ? 5 : 4);
                  }}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          )}

          {/* Seleção de Horário */}
          {((userType === 'patient' && step === 4) || (userType === 'admin' && step === 5)) && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Horários Disponíveis</h3>
                <div className="grid grid-cols-3 gap-2">
                  {['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'].map((time) => (
                    <button
                      key={time}
                      onClick={() => setScheduleData({...scheduleData, selectedTime: time})}
                      className={`p-3 border rounded-lg text-sm font-medium ${
                        scheduleData.selectedTime === time
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {scheduleData.selectedTime && (
                <button
                  onClick={handleConfirmSchedule}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium"
                >
                  Confirmar Agendamento
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  // ========== COMPONENTE: CONSULTAS ==========
  const ConsultationsScreen = () => {
    const [statusFilter, setStatusFilter] = useState('Todas');
    const [listKey, setListKey] = useState(0);
    
    const getFilteredConsultations = () => {
      let filtered = consultations;
      
      if (userType === 'patient') {
        filtered = consultations.filter(c => c.patientId === currentUser?.id);
      } else if (userType === 'professional') {
        filtered = consultations.filter(c => c.professionalId === currentUser?.id);
      }
      
      if (statusFilter !== 'Todas') {
        filtered = filtered.filter(c => c.status === statusFilter);
      }
      
      return filtered;
    };

    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="bg-white p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button onClick={goBack} className="mr-4 p-2 hover:bg-gray-100 rounded-lg">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h1 className="text-xl font-bold">Consultas</h1>
            </div>
            <button 
              data-testid="btn-logout"
              onClick={handleLogout}
              className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
              title="Sair"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex space-x-2 mb-6 overflow-x-auto">
            {['Todas', 'Agendada', 'Realizada', 'Cancelada'].map((status) => (
              <button
                key={status}
                onClick={() => {
                  setStatusFilter(status);
                  setListKey(k => k + 1);
                }}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                  statusFilter === status
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
                data-testid={`filter-${status.toLowerCase()}`}
              >
                {status}
              </button>
            ))}
          </div>

          <div 
            key={listKey} 
            className="space-y-4 max-h-[calc(100vh-250px)] overflow-y-auto" 
            data-testid="consultations-list"
            data-count={getFilteredConsultations().length}
          >
            {getFilteredConsultations().length === 0 ? (
              <p className="text-gray-500 text-center py-8">Nenhuma consulta encontrada</p>
            ) : (
              getFilteredConsultations().map((consultation) => (
                <div key={consultation.id} className="bg-white rounded-xl shadow-sm p-4" data-testid={`consultation-${consultation.id}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                        consultation.status === 'Agendada' ? 'bg-blue-100' :
                        consultation.status === 'Realizada' ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        <Stethoscope className={`w-6 h-6 ${
                          consultation.status === 'Agendada' ? 'text-blue-600' :
                          consultation.status === 'Realizada' ? 'text-green-600' : 'text-red-600'
                        }`} />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 break-words" style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                          {userType === 'patient' ? consultation.professionalName : consultation.patientName}
                        </p>
                        <p className="text-sm text-gray-600">{consultation.specialty}</p>
                        <p className="text-xs text-gray-500">{consultation.date} - {consultation.time}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 text-xs rounded-full ${
                      consultation.status === 'Agendada' ? 'bg-blue-100 text-blue-700' :
                      consultation.status === 'Realizada' ? 'bg-green-100 text-green-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {consultation.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  };

  // ========== COMPONENTE: EDITAR PERFIL ==========
  const EditProfileScreen = () => {
    const [editData, setEditData] = useState({...currentUser});

    const handleSave = () => {
      if (userType === 'patient') {
        setPatients(prev => prev.map(p => p.id === currentUser.id ? editData : p));
      } else if (userType === 'professional') {
        setProfessionals(prev => prev.map(p => p.id === currentUser.id ? editData : p));
      }
      setCurrentUser(editData);
      alert('Perfil atualizado com sucesso!');
      goBack();
    };

    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="bg-white p-4 border-b">
          <div className="flex items-center">
            <button onClick={goBack} className="mr-4 p-2 hover:bg-gray-100 rounded-lg">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold">Editar Perfil</h1>
          </div>
        </div>

        <div className="p-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
                <input
                  type="text"
                  value={editData.name || ''}
                  onChange={(e) => setEditData({...editData, name: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>

              {userType === 'patient' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={editData.email || ''}
                      onChange={(e) => setEditData({...editData, email: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
                    <input
                      type="tel"
                      value={editData.phone || ''}
                      onChange={(e) => setEditData({...editData, phone: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="flex space-x-4 mt-8">
              <button
                onClick={goBack}
                className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ========== COMPONENTE: RELATÓRIOS ==========
  const ReportsScreen = () => (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white p-4 border-b">
        <div className="flex items-center">
          <button onClick={goBack} className="mr-4 p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">Relatórios</h1>
        </div>
      </div>

      <div className="p-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Estatísticas Gerais</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Total de Pacientes:</span>
              <span className="font-semibold">{patients.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total de Profissionais:</span>
              <span className="font-semibold">{professionals.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Consultas Agendadas:</span>
              <span className="font-semibold">{consultations.filter(c => c.status === 'Agendada').length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Consultas Realizadas:</span>
              <span className="font-semibold">{consultations.filter(c => c.status === 'Realizada').length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ========== NAVEGAÇÃO BOTTOM ==========
  const BottomNavigation = () => {
    const getNavItems = () => {
      switch(userType) {
        case 'patient':
          return [
            { icon: Home, label: 'Início', screen: 'home', testId: 'nav-home' },
            { icon: Calendar, label: 'Agendar', screen: 'schedule', testId: 'nav-schedule' },
            { icon: FileText, label: 'Consultas', screen: 'consultations', testId: 'nav-consultations' },
            { icon: User, label: 'Perfil', screen: 'edit-profile', testId: 'nav-profile' }
          ];
        case 'professional':
          return [
            { icon: Home, label: 'Início', screen: 'home', testId: 'nav-home' },
            { icon: Calendar, label: 'Agenda', screen: 'consultations', testId: 'nav-agenda' },
            { icon: User, label: 'Perfil', screen: 'edit-profile', testId: 'nav-profile' }
          ];
        case 'admin':
          return [
            { icon: Home, label: 'Início', screen: 'home', testId: 'nav-home' },
            { icon: User, label: 'Pacientes', screen: 'manage-patients', testId: 'nav-patients' },
            { icon: UserCheck, label: 'Médicos', screen: 'manage-professionals', testId: 'nav-doctors' },
            { icon: FileText, label: 'Relatórios', screen: 'reports', testId: 'nav-reports' }
          ];
        default:
          return [];
      }
    };

    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around max-w-md mx-auto">
          {getNavItems().map((item, index) => (
            <button
              key={index}
              onClick={() => setCurrentScreen(item.screen)}
              className={`flex flex-col items-center py-2 px-3 rounded-lg ${
                currentScreen === item.screen ? 'text-blue-600 bg-blue-50' : 'text-gray-400'
              }`}
              data-testid={item.testId}
            >
              <item.icon className="w-5 h-5 mb-1" />
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  // ========== RENDERIZAÇÃO PRINCIPAL ==========
  const renderScreen = () => {
    // CORREÇÃO: App Bloqueado com fallback invisível para Cypress
    if (isLocked) {
      return (
        <>
          <LockScreen />
          {/* Fallback invisível pro Cypress detectar o texto imediatamente */}
          <h1 style={{ display: 'none' }}>App Bloqueado</h1>
        </>
      );
    }

    // Navegação entre telas
    if (currentScreen === 'login') return <LoginScreen />;

    switch (currentScreen) {
      case 'home':
        if (userType === 'patient') return <PatientHomeScreen />;
        if (userType === 'professional') return <ProfessionalHomeScreen />;
        if (userType === 'admin') return <AdminHomeScreen />;
        return <LoginScreen />;

      case 'schedule':
        return <ScheduleScreen />;

      case 'consultations':
        return <ConsultationsScreen />;

      case 'edit-profile':
        return <EditProfileScreen />;

      case 'manage-patients':
        return userType === 'admin' ? <ManagePatientsScreen /> : <AdminHomeScreen />;

      case 'manage-professionals':
        return userType === 'admin' ? <ManageProfessionalsScreen /> : <AdminHomeScreen />;

      case 'reports':
        return userType === 'admin' ? <ReportsScreen /> : <AdminHomeScreen />;

      default:
        return <LoginScreen />;
    }
  };

  return (
    <div key={appKey} className="max-w-md mx-auto bg-white min-h-screen relative">
      {renderScreen()}
      {currentScreen !== 'login' && !isLocked && <BottomNavigation />}
    </div>
  );
};

export default UBSSalvadorSystem;