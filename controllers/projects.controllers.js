const {
    fetchProjects,
    addProject,
    updateProject,
} = require('../models/projects.models');

exports.getProjects = (req, res, next) => {
    const { project_id } = req.params;
    fetchProjects(project_id)
        .then((projects) => {
            if (project_id) {
                res.status(200).send({ project: projects });
            } else {
                res.status(200).send({ projects });
            }
        })
        .catch((err) => {
            next(err);
        });
};

exports.postProject = (req, res, next) => {
    const { project } = req.body;
    addProject(project)
        .then((project) => {
            res.status(201).send({ project });
        })
        .catch((err) => {
            next(err);
        });
};

exports.patchProject = (req, res, next) => {
    const { project_id } = req.params;
    const { project } = req.body;

    updateProject(project_id, project)
        .then((project) => {
            res.status(201).send({ project });
        })
        .catch((err) => {
            next(err);
        });
};
