import React, { useState } from 'react';
import data from './data.json'; // Điều chỉnh đường dẫn nếu cần

const Dashboard = () => {
    const [systems, setSystems] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [systemName, setSystemName] = useState('');
    const [systemId, setSystemId] = useState('');
    const [humidityThreshold, setHumidityThreshold] = useState('');
    const [newHumidityThreshold, setNewHumidityThreshold] = useState('');

    const handleAddSystem = () => {
        const systemData = data.find(system => system.id === systemId);

        if (!systemData) {
            alert('Không tìm thấy ID hệ thống');
            return;
        }

        const newSystem = {
            name: systemName,
            id: systemId,
            threshold: systemData.threshold,
            data: {
                temperature: systemData.temperature,
                humidity: systemData.humidity,
                waterLevel: systemData.waterLevel,
                soilMoisture: systemData.soilMoisture
            }
        };

        setSystems([...systems, newSystem]);

        setSystemName('');
        setSystemId('');
        setHumidityThreshold('');
        setShowForm(false);
    };

    const handleDeleteSystem = (index) => {
        const updatedSystems = [...systems];
        updatedSystems.splice(index, 1);
        setSystems(updatedSystems);
    };

    const handleShowForm = () => {
        setShowForm(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'systemName':
                setSystemName(value);
                break;
            case 'systemId':
                setSystemId(value);
                break;
            case 'humidityThreshold':
                setHumidityThreshold(value);
                break;
            default:
                break;
        }
    };

    const handleChangeThreshold = (index) => {
        const updatedSystems = [...systems];
        updatedSystems[index].showChangeForm = true;
        setSystems(updatedSystems);
    };

    const handleSaveThreshold = (index) => {
        const updatedSystems = [...systems];
        updatedSystems[index].threshold = newHumidityThreshold;
        updatedSystems[index].showChangeForm = false;
        setSystems(updatedSystems);
    };

    const handleCancelThreshold = (index) => {
        const updatedSystems = [...systems];
        updatedSystems[index].showChangeForm = false;
        setSystems(updatedSystems);
    };

    const handleNewThresholdChange = (e, index) => {
        const { value } = e.target;
        setNewHumidityThreshold(value);
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center">Dashboard</h2>
            <div className="row">
                <div className="col-12">
                    <h4>Manage Systems</h4>
                    <button className="btn btn-success mb-3" onClick={handleShowForm}>
                        Add System
                    </button>
                    {showForm && (
                        <form>
                            <div className="form-group">
                                <label htmlFor="systemName">System Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="systemName"
                                    name="systemName"
                                    value={systemName}
                                    onChange={handleInputChange}
                                    placeholder="Enter system name"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="systemId">System ID</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="systemId"
                                    name="systemId"
                                    value={systemId}
                                    onChange={handleInputChange}
                                    placeholder="Enter system ID"
                                />
                            </div>
                            <button type="button" className="btn btn-primary" onClick={handleAddSystem}>
                                Submit
                            </button>
                        </form>
                    )}
                    <ul className="list-group mt-3">
                        {systems.map((system, index) => (
                            <li key={index} className="list-group-item">
                                <div className="d-flex justify-content-between align-items-center flex-wrap">
                                    <div className="col-md-4 system-info">
                                        <h5>{system.name}</h5>
                                        <p>ID: <span className="badge badge-secondary text-white bg-primary">{system.id}</span></p>
                                        <p>Temperature: <span className="badge badge-primary text-white bg-danger">{system.data.temperature}</span></p>
                                        <p>Humidity: <span className="badge badge-secondary text-white bg-danger">{system.data.humidity}</span></p>
                                        <p>Water Level: <span className="badge badge-info text-white bg-danger">{system.data.waterLevel}</span></p>
                                        <p>Soil Moisture: <span className="badge badge-success text-white bg-danger">{system.data.soilMoisture}</span></p>
                                    </div>
                                    <div className="col-md-4 system-actions">
                                        {system.showChangeForm ? (
                                            <form>
                                                <div className="form-group">
                                                    <label htmlFor="newHumidityThreshold">New Ngưỡng độ ẩm đất</label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        value={newHumidityThreshold}
                                                        onChange={(e) => handleNewThresholdChange(e, index)}
                                                        placeholder="Enter new threshold"
                                                    />
                                                </div>
                                                <button
                                                    type="button"
                                                    className="btn btn-primary mr-2"
                                                    onClick={() => handleSaveThreshold(index)}
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-secondary"
                                                    onClick={() => handleCancelThreshold(index)}
                                                >
                                                    Cancel
                                                </button>
                                            </form>
                                        ) : (
                                            <>
                                                <p><span style={{ color: 'red' }}>Ngưỡng độ ẩm đất:</span> <span className="badge badge-secondary text-white bg-danger">{system.threshold}</span></p>
                                                <button className="btn btn-danger btn-sm" onClick={() => handleChangeThreshold(index)}>
                                                    Change
                                                </button>
                                            </>
                                        )}
                                    </div>
                                    <div className="col-md-4 system-delete">
                                        <button className="btn btn-danger btn-sm" onClick={() => handleDeleteSystem(index)}>Delete</button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
